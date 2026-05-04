# KestKlar — Technical Architecture

Version 1.1 · May 2026 · Stackforge GmbH

## 1. Product Overview

KestKlar automates the Austrian capital gains tax (KeSt) workflow for private investors using non-tax-simple foreign brokers (Interactive Brokers, Scalable Capital, DEGIRO, Trade Republic).

The product ingests broker statements (PDF or CSV), fetches fund tax data from the ÖEKB (Österreichische Kontrollbank), applies Austrian tax rules, and produces the exact Kennzahlen values for the E1kv supplementary schedule of the Einkommensteuererklärung.

**Core user problem**

- Non-tax-simple brokers do not remit KeSt automatically — the investor must calculate it manually
- Austrian rules (weighted average pricing, ÖEKB deemed distributions, cross-broker loss netting) differ materially from German rules and generic European tools
- ÖEKB data for accumulating ETFs (ausschüttungsgleiche Erträge) is not in any broker report — it requires per-fund, per-year manual lookups at my.oekb.at
- The full manual process takes 3–8 hours per tax year and requires domain knowledge most retail investors don't have

**What KestKlar produces**

- KZ 937 / 936 — ausschüttungsgleiche Erträge (foreign / domestic custody)
- KZ 985 — foreign dividends and ongoing income
- KZ 994 — realised capital gains
- KZ 996 — realised losses (after cross-broker netting)
- KZ 998 — creditable foreign withholding tax
- PDF tax report export for own records

## 2. System Architecture

KestKlar is a monolith-first Next.js app on **Vercel**, with **Cloudflare** providing all supporting infrastructure (storage, queues, durable workflows, edge protection). Two vendors do the heavy lifting; the rest are domain-specific SaaS we don't try to replace.

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 15 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS 3 |
| API | tRPC v11 — co-located with Next.js |
| Auth | Clerk |
| Database | Neon Postgres (EU / Frankfurt) |
| ORM | Prisma 5 |
| File storage | Cloudflare R2 (`jurisdiction: eu`) |
| Background jobs | Cloudflare Workflows + Queues + Cron Triggers |
| Edge / WAF / Bot | Cloudflare DNS, WAF, Turnstile, KV (rate limit only) |
| Email | Loops.so |
| Billing | Stripe |
| Hosting | Vercel |
| Error tracking | Sentry (EU) |
| Analytics | PostHog (EU cloud) |

### 2.1 High-level data flow

| Stage | Description |
| --- | --- |
| 1. Ingest | Client uploads directly to R2 via presigned URL. Vercel API enqueues a job onto a Cloudflare Queue. |
| 2. Parse | Cloudflare Workflow consumes the queue, runs the per-broker parser, writes normalised `Transaction` rows to Neon, deletes the R2 object. |
| 3. ÖEKB fetch | For each unique ISIN held in the tax year, Workflow queries my.oekb.at and caches results in `OekbFundData`. |
| 4. FX conversion | Non-EUR amounts converted using ECB reference rates (Frankfurter API), cached daily in Neon. |
| 5. Tax engine | Pure TypeScript calculation module (runs on Vercel during recalc tRPC call). |
| 6. E1kv output | Results stored per `(userId, taxYear)`. PDF export via `@react-pdf/renderer` on demand. |

## 3. Data Models

All models in Prisma. Raw transactions stored normalised (never raw PDF text). ÖEKB data is a read-through cache. Tax results stored per `(userId, taxYear)` and recalculable on demand.

**User**

| Field | Type / Notes |
| --- | --- |
| id | cuid — Clerk user ID |
| email | string |
| plan | enum: FREE \| STANDARD \| PRO |
| stripeCustomerId | string \| null |
| createdAt | DateTime |

**BrokerUpload**

| Field | Type / Notes |
| --- | --- |
| id | cuid |
| userId | FK → User |
| broker | enum: IBKR \| SCALABLE \| DEGIRO \| TRADE_REPUBLIC \| MANUAL |
| taxYear | Int |
| filename | string |
| status | enum: PENDING \| PARSING \| DONE \| FAILED |
| parsedAt | DateTime \| null |
| errorMessage | string \| null |

**Transaction**

| Field | Type / Notes |
| --- | --- |
| id | cuid |
| uploadId | FK → BrokerUpload |
| userId | FK → User |
| type | enum: DIVIDEND \| CAPITAL_GAIN \| CAPITAL_LOSS \| INTEREST \| DEEMED_DISTRIBUTION \| WITHHOLDING_TAX |
| isin | string \| null |
| date | DateTime |
| quantity | Decimal \| null |
| priceEur | Decimal \| null |
| grossAmountEur | Decimal |
| withholdingTaxEur | Decimal |
| currency | string |
| fxRate | Decimal |
| fxDate | DateTime |

**Position** — running weighted average cost basis per `(userId, isin)`, recalculated on each upload parse.

| Field | Type / Notes |
| --- | --- |
| id | cuid |
| userId | FK → User |
| isin | string |
| taxYear | Int |
| quantityHeld | Decimal |
| avgCostBasisEur | Decimal |
| lastUpdated | DateTime |

**OekbFundData** — cached ÖEKB deemed distribution data per fund per year.

| Field | Type / Notes |
| --- | --- |
| id | cuid |
| isin | string |
| taxYear | Int |
| reportingDate | DateTime |
| deemedDistributionPerUnit | Decimal |
| currency | string |
| fxRateOnReportingDate | Decimal |
| fetchedAt | DateTime |
| source | string — ÖEKB record URL |

**TaxCalculationResult** — final E1kv field values per `(userId, taxYear)`.

| Field | Type / Notes |
| --- | --- |
| id | cuid |
| userId | FK → User |
| taxYear | Int |
| kz937 | Decimal |
| kz936 | Decimal |
| kz985 | Decimal |
| kz994 | Decimal |
| kz996 | Decimal |
| kz998 | Decimal |
| grossKest | Decimal — 27.5% × (kz985 + kz994 + kz936 + kz937) |
| netKest | Decimal — grossKest − kz998 |
| calculatedAt | DateTime |
| warnings | Json[] |

## 4. PDF Parsing Pipeline

Each broker has a dedicated parser — a stateless TypeScript module that takes a file buffer and returns structured data or throws a typed error. Parsers run inside the `parseBrokerUpload` Cloudflare Workflow (see §8), which gives durable retries and observability for free.

| Broker | Input format & approach |
| --- | --- |
| Interactive Brokers | Prefer CSV Activity Statement (Flex Query); parse with papaparse. Fall back to PDF text via pdf-parse. |
| Scalable Capital | Jahressteuerbescheinigung PDF — pdf-parse + regex on labelled sections. |
| DEGIRO | Annual Report PDF — pdfjs-dist for positional text extraction (table layout). |
| Trade Republic | Steuerreport PDF — pdf-parse + regex (only needed for tax years before April 2025). |
| Manual / fallback | CSV import with column-mapping wizard. |

**Libraries**

- `pdf-parse` — text extraction (Scalable, Trade Republic)
- `pdfjs-dist` — positional extraction (DEGIRO). Requires Workers `nodejs_compat` flag.
- `papaparse` — CSV (IBKR Flex Query)
- `zod` — schema validation on all parser output before DB write

**Error handling**

- `ParseError` typed union: `UNSUPPORTED_FORMAT | MISSING_SECTION | AMBIGUOUS_DATA | WRONG_TAX_YEAR`
- Partial success allowed — surface warnings to user
- All errors stored in `BrokerUpload.errorMessage`
- LLM fallback (Claude API) reserved for v2

## 5. ÖEKB Integration

Primary technical moat. No competitor automates this step. Runs in the `fetchOekbData` Cloudflare Workflow.

**Data needed per fund per year**

- Ausschüttungsgleiche Erträge per unit (in fund currency)
- Reporting date (Stichtag) — varies per fund, not always 31 December
- Fund currency

**Approach**

- Phase 1 (MVP): structured HTTP scraping. my.oekb.at exposes a public search endpoint returning JSON for ISIN lookups. Replicate the browser's API calls server-side from a Worker.
- Phase 2 (fallback): Browser Rendering API (Cloudflare's hosted headless Chromium) if the site requires JS rendering or session tokens.

| Concern | Mitigation |
| --- | --- |
| Rate limiting | Crawl-delay + jitter, run in Workflow not request path |
| Data immutability | Cache `(ISIN, taxYear)` permanently — ÖEKB never edits past data |
| Missing ISINs | Surface warning: "Fund not a Meldefonds — 90% of gain rule applies" |
| Exchange rates | ECB daily rates via Frankfurter API |
| Legal | Public data, no auth required |

## 6. Tax Calculation Engine

Pure TypeScript, no side effects. Plain-data in, plain-data out. 100% branch-coverage target. Runs on Vercel during the `calculations.calculate` tRPC call.

**Module: Position Tracker** — gleitender Durchschnittspreis for Neubestand (≥ 1 April 2012).

```ts
function updatePosition(
  current: Position,
  trade: { type: BUY | SELL, quantity: Decimal, priceEur: Decimal }
): Position
```

- BUY: `newAvgCost = (currentQty × currentAvg + tradeQty × tradePrice) / (currentQty + tradeQty)`
- SELL: realised gain = `qty × (salePrice − avgCost)`; avgCost unchanged
- Tracked per `(userId, isin, taxYear)` — reset 1 January, carry forward quantity + avgCost

**Module: Deemed Distribution Calculator**

```ts
function calcDeemedDistribution(
  position: Position,  // quantity held on ÖEKB reportingDate
  oekb: OekbFundData
): Decimal             // EUR amount for E1kv
```

- Quantity snapshotted at ÖEKB `reportingDate`, NOT year-end
- Amount = `oekb.deemedDistributionPerUnit × quantityOnReportingDate × oekb.fxRateOnReportingDate`
- Routes to KZ 937 (foreign depot) or KZ 936 (Austrian depot)

**Module: Loss Netter** — aggregates gains and losses across all `BrokerUpload`s for `(userId, taxYear)`.

```ts
function netLosses(transactions: Transaction[]): {
  totalGains: Decimal
  totalLosses: Decimal
  kz994: Decimal  // net gains (≥ 0)
  kz996: Decimal  // net losses (absolute)
}
```

- Equities, ETFs and bonds offset each other
- No carryforward — pool resets 1 January
- Dividends and deemed distributions NOT offset against capital losses

**Module: Withholding Tax Calculator** — sums `Transaction.withholdingTaxEur` for the tax year, capped at 27.5% of gross dividend income from that source. Result → KZ 998.

**Module: E1kv Assembler**

| Kennzahl | Source |
| --- | --- |
| KZ 937 | Sum of deemed distributions for foreign-depot ISINs |
| KZ 936 | Sum of deemed distributions for Austrian-depot ISINs |
| KZ 985 | Sum of `grossAmountEur` where `type = DIVIDEND` |
| KZ 994 | `totalGains` from LossNetter |
| KZ 996 | `totalLosses` from LossNetter |
| KZ 998 | `calcWithholdingTax()` |
| grossKest | 27.5% × (KZ 937 + KZ 936 + KZ 985 + KZ 994) |
| netKest | grossKest − KZ 998 (≥ 0) |

## 7. API Layer (tRPC)

All client–server communication via tRPC, co-located in `app/server/`.

| Router | Key procedures |
| --- | --- |
| uploads | `create` (presigned R2 URL), `list`, `delete`, `getStatus` |
| calculations | `calculate`, `getResult`, `listYears` |
| oekb | `lookupFund`, `getStatus` |
| billing | `createCheckout`, `getSubscription`, `createPortalSession` |
| user | `getMe`, `updateProfile` |

**Auth & limits**

- Clerk session validated in tRPC context on every call
- Plan gates on `calculations.*` — FREE sees totals only, not Kennzahlen
- Rate limit on `uploads.create`: max 10/hour/user — token bucket in Cloudflare KV

## 8. Background Jobs (Cloudflare)

Long-running work runs on Cloudflare. **Queues** carry job payloads, **Workflows** give durable retries and step-level observability, **Cron Triggers** handle scheduled work. No separate jobs vendor.

**Workflow: `parseBrokerUpload`**

| Property | Value |
| --- | --- |
| Trigger | `uploads.create` enqueues `{ uploadId }` to `parse-uploads` queue |
| Steps | 1. Read file from R2 → 2. Select parser by broker → 3. Parse → 4. Validate with Zod → 5. Write `Transaction`s via Hyperdrive → 6. Delete R2 object → 7. Update `BrokerUpload.status` → 8. Enqueue `fetchOekbData` for new ISINs |
| Retry | Workflow steps retry with exponential backoff (Cloudflare default) |
| Timeout | 120s per step |
| Failure | Set `status=FAILED`, write `errorMessage`, send Loops email |

**Workflow: `fetchOekbData`**

| Property | Value |
| --- | --- |
| Trigger | After parse completes, per unique ISIN not in cache |
| Steps | 1. Check `OekbFundData` cache → 2. On miss: fetch my.oekb.at → 3. Fetch ECB rate for `reportingDate` → 4. Write to cache → 5. Trigger recalculation |
| Schedule | Cron Trigger: daily during March–June to pre-warm cache for known ISINs |
| Rate limit | 1 req / 2s to ÖEKB, max 50 ISINs per run |

## 9. Frontend Architecture

**Routes**

| Route | Purpose |
| --- | --- |
| `/` | Landing (waitlist, how-it-works, FAQ) |
| `/preise` | Pricing |
| `/ratgeber/[slug]` | SEO articles (DE) — static |
| `/en/ratgeber/[slug]` | SEO articles (EN) — static |
| `/app` | App shell — Clerk-gated |
| `/app/[year]` | Tax-year dashboard |
| `/app/[year]/upload` | Upload wizard |
| `/app/[year]/result` | E1kv display + PDF export |
| `/app/settings` | Account, billing, data deletion |

**State**

- Server state: TanStack Query (all tRPC procedures wrapped)
- Form state: React Hook Form + Zod resolvers
- UI state: `useState` / context — no global store
- Language: existing `useLang()` context (DE/EN)

**Key libraries**

| Library | Use |
| --- | --- |
| `@tanstack/react-query` | Server state, caching |
| `react-hook-form` | Upload + settings forms |
| `zod` | Shared validation (server + client) |
| `@react-pdf/renderer` | PDF export of tax report |
| `react-dropzone` | Drag-and-drop upload |
| `recharts` | Tax-year summary chart (v2) |
| `date-fns` | Date formatting |

## 10. Infrastructure & Deployment

| Service | Provider | Notes |
| --- | --- | --- |
| Frontend + API | Vercel | Next.js, EU functions region (Frankfurt), preview deploys per PR |
| Database | Neon | Serverless Postgres, EU (Frankfurt). Hyperdrive in front for Workers. |
| File storage | Cloudflare R2 | `jurisdiction: eu`, 24h lifecycle rule on uploads bucket |
| Queues | Cloudflare Queues | `parse-uploads`, `fetch-oekb` |
| Workflows | Cloudflare Workflows | `parseBrokerUpload`, `fetchOekbData` |
| Cron | Cloudflare Cron Triggers | Daily ÖEKB pre-warm Mar–Jun |
| Edge / WAF | Cloudflare | DNS, WAF, Turnstile on waitlist + upload, KV for rate-limit tokens |
| Auth | Clerk | EU data residency, webhook → user sync |
| Email | Loops.so | Waitlist, transactional, sequences |
| Billing | Stripe | One-time annual payments |
| Errors | Sentry | EU region, sourcemaps on deploy |
| Analytics | PostHog | EU cloud, cookieless mode |

**Environment variables**

```
DATABASE_URL                     # Neon (Vercel)
HYPERDRIVE_BINDING               # Workers binding to Hyperdrive
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET                        # kestklar-uploads (jurisdiction: eu)
CF_ACCOUNT_ID
CF_API_TOKEN                     # for queue enqueue from Vercel
TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
LOOPS_API_KEY
SENTRY_DSN
POSTHOG_KEY
```

## 11. Security & GDPR

**Data minimisation**

- Raw PDF/CSV deleted from R2 immediately after successful parse
- Only normalised `Transaction` records stored — never raw document text
- `/app/settings` cascade-deletes all user data on request

**Data residency**

- All services EU region: Vercel functions (Frankfurt), Neon (Frankfurt), R2 (`jurisdiction: eu`), Workflows/Queues (EU), Clerk EU, Sentry EU, PostHog EU cloud
- **Cloudflare KV is globally replicated by design** — used only for rate-limit tokens (no PII)
- GDPR Art. 13 disclosures in Datenschutzerklärung — Loops.so, Cloudflare Germany GmbH, Neon, Clerk, Stripe named as processors

**Access control**

- All DB queries scoped to `userId` at the ORM layer
- Clerk session validated in tRPC context on every request
- Direct-to-R2 presigned uploads — server never handles raw file bytes in request body
- Turnstile on waitlist + upload to block automated abuse

**Secrets**

- Vercel env vars (Next.js) + Wrangler secrets (Workers) — never in source
- Separate sets for dev / preview / production
- Stripe webhook signature verified on every webhook

## 12. Testing Strategy

| Layer | Approach |
| --- | --- |
| Tax calculation engine | Vitest unit tests, 100% branch coverage. Real-world examples cross-checked against manual calculations and BMF docs. |
| PDF parsers | Vitest with fixture files (one real statement per broker per year). Happy path + edge cases. |
| ÖEKB integration | Nightly CI integration tests against live my.oekb.at for known ISINs. |
| tRPC procedures | Vitest + `@trpc/server` test utils, in-memory Prisma. |
| Workflows | Cloudflare Workflows local dev (`wrangler dev`) + integration tests in staging. |
| E2E | Playwright — upload → calculate → result, per supported broker, on staging. |
| Tax-rule regression | Golden-file tests: known inputs → known E1kv output. Any tax-logic change must update goldens with justification. |

## 13. Development Phases

**Phase 1 — IBKR MVP** (target: 6 weeks)

- IBKR CSV parser
- Weighted average position tracker
- Manual ÖEKB data entry (paste from my.oekb.at) — auto-fetch in Phase 2
- Single tax year, single broker
- E1kv field display (no PDF export)
- Clerk auth, Stripe one-time payment
- Deploy to production

**Phase 2 — Multi-broker + ÖEKB automation** (+4 weeks)

- Scalable Capital parser
- DEGIRO parser
- ÖEKB auto-fetch via `fetchOekbData` Workflow
- ECB exchange rate integration
- Cross-broker loss netting
- PDF export

**Phase 3 — Polish + Trade Republic** (+2 weeks)

- Trade Republic parser (partial 2025 support)
- Multi-year support
- Edge-case warnings (Altbestand, non-Meldefonds)
- Onboarding email sequence

**Phase 4 — Growth** (ongoing)

- More broker parsers based on waitlist data
- CSV import wizard for unsupported brokers
- Crypto support (Bitpanda, Coinbase)
- Steuerberater referral programme

## 14. Competitive Landscape

| Competitor | Gap vs KestKlar | Notes |
| --- | --- | --- |
| Tax-Wizard | Multi-country generic, English-first, no ÖEKB automation | Closest competitor. AT supported but not AT-first. |
| AlphaConvert | IBKR-only, no ÖEKB, German-focused | Single broker. Technical audience, Excel output. |
| Pfennigfuchser Excel template | Manual spreadsheet | Free community resource. Proves demand. |
| Austrian tax advisors | €150–300/year, slow, manual | KestKlar is 10× cheaper, 50× faster for the calculation step. |

Primary moat: **ÖEKB automation**. Most time-consuming step, most error-prone, no automated tool currently does it. Ship this first.

## 15. Data Integrity & ÖEKB Sanity Checks

ÖEKB is the source of truth and the place we are most likely to be silently wrong. Controls below are layered so a single failure (site change, parsing bug, stale cache) is caught before it reaches a user's tax return.

### 15.1 At fetch time — block bad data from entering the cache

- **Zod schema on every scraped record** — reject if `deemedDistributionPerUnit`, `currency`, `reportingDate`, ISIN, or source URL is missing. No partial writes.
- **Bounds check** — `deemedDistributionPerUnit / NAV` must be in `[0, 0.5]`. Outside that range is almost certainly a parsing error. Flag for review, do not cache.
- **Currency whitelist** — must be a known ISO 4217 code; reject silently coerced values.
- **Stichtag in window** — `reportingDate` must fall in the claimed tax year ±60 days (some funds report early Jan).
- **Structural fingerprint of the source page** — store a hash of the HTML/JSON shape we scraped from. If the next fetch sees a different shape, alarm and refuse to write. Catches ÖEKB site changes before they corrupt the cache.

### 15.2 Internal math invariants — every calculation must satisfy

- `grossKest = 27.5% × (KZ 937 + KZ 936 + KZ 985 + KZ 994)` to the cent. Any rounding drift = bug.
- `KZ 998 ≤ 27.5% × foreign-dividend basis` (no overcredit possible by construction).
- For each ETF: `quantityOnStichtag` ≤ max(quantityEverHeld). Negative or absurd snapshot = bug.
- `KZ 996 ≥ 0` (stored as absolute value). Sign errors caught immediately.
- Re-derive EUR amount independently: `perUnit × qty × ECB(Stichtag)` recomputed from raw inputs must equal cached `grossAmountEur`.

### 15.3 Continuous canary — catch drift over time

- **Golden fund set** — 20–30 widely held ISINs (Core MSCI World, S&P 500, Emerging, EUR Gov Bond, etc.) with manually verified historical values for the last 5 tax years.
- **Nightly CI re-fetches the goldens** and compares against locked values. Any disagreement → Sentry alert + halt new ÖEKB cache writes until reviewed.
- **New-tax-year canary** — first week of February, force-fetch goldens and assert we are getting the new year's record, not the prior one. Catches the case where ÖEKB has not yet published but we silently serve stale.

### 15.4 Cross-source spot checks — catch systematic bias

- ÖEKB also publishes a per-fund PDF Steuermeldung alongside the structured record. Parse both, require numerical agreement to within €0.0001/unit. Two extractors checking each other.
- For the golden set: cross-reference Pfennigfuchser community spreadsheets and 1–2 Austrian tax-advisor blogs. Manual, annual, low effort, very high signal.
- **FX cross-check** — independently re-fetch ECB rate for `reportingDate` from a second source (e.g. `exchangerate.host`) once per month for the goldens. Disagreement >0.05% → investigate.

### 15.5 Audit trail — provable after the fact

- For each `TaxCalculationResult`, persist `(ISIN, taxYear, sourceUrl, fetchedAt, rawJson)` for every ÖEKB record used. Append-only.
- Never overwrite a cache row — re-fetches insert a new row with newer `fetchedAt`. Old calculations remain bit-for-bit reproducible.
- If a user disputes a number, we can show: "we read X from this URL on this date, here is the raw response, here is the math."

### 15.6 Human in the loop — especially v1

- First ~50 paying users: 10% sample manually QA'd by a domain reviewer before the user sees the result. Generates fixtures for golden tests.
- Per-result **confidence label** in UI: green (perfect schema match + canary green + bounds pass), yellow (any soft warning), red (engage a Steuerberater). Don't hide uncertainty.
- **User can override any ÖEKB value manually** with a note (e.g. their Steuerberater confirmed a different number). Override is recorded, never silently merged with our value.

### 15.7 Legal posture — we are not the Steuerberater

- ToS makes clear: KestKlar provides automation; user is responsible for filing correctness. Same disclaimer Pfennigfuchser-style community tools use.
- No "tax advice" language in marketing. "Berechnungshilfe" / "calculation tool."
- Berufshaftpflicht-style insurance once revenue justifies — Stage 2/3, not before.

### 15.8 Phase 1 cut — minimum viable integrity controls

If a smaller subset must ship before launch:

1. Zod + bounds-check at fetch time (§15.1)
2. Math invariants in tests (§15.2)
3. Golden set of 10 ISINs × 3 tax years (§15.3, abridged)
4. Audit trail — append-only `OekbFundData`, store source URL + raw JSON (§15.5)
5. Manual override + confidence label in UI (§15.6)

Everything else (PDF cross-parse, weekly canaries, second FX source) is Phase 2 once real volume justifies it.

## 16. Operator Automation (MCP)

Every vendor in this stack except Loops.so ships an official Model Context Protocol server. Per-vendor automation playbooks, scopes, and caveats live in [`mcp/`](./mcp/):

- [`mcp/README.md`](./mcp/README.md) — index, operating principles, quick setup
- [`mcp/vercel.md`](./mcp/vercel.md) — deploys, build/runtime logs
- [`mcp/cloudflare.md`](./mcp/cloudflare.md) — Bindings, Observability, Logpush, Browser, Workers Builds
- [`mcp/neon.md`](./mcp/neon.md) — schema migrations on branches, cache health, slow-query digest
- [`mcp/clerk.md`](./mcp/clerk.md) — docs/SDK helper, future MCP-authed endpoints
- [`mcp/stripe.md`](./mcp/stripe.md) — support triage, partner coupons, MRR digest
- [`mcp/sentry.md`](./mcp/sentry.md) — alert → diagnosis loop, ÖEKB drift cache-freeze trigger
- [`mcp/posthog.md`](./mcp/posthog.md) — feature-flag rollouts, funnel monitoring
- [`mcp/github.md`](./mcp/github.md) — PR hygiene, CI triage, regression PRs

Loops.so has no first-party MCP server; we drive it via REST.

## Appendix — External References

- BMF E1kv 2024 form: formulare.bmf.gv.at/service/formulare/inter-Steuern/pdfs/2024/E1kv.pdf
- ÖEKB fund tax data portal: my.oekb.at
- ECB exchange rates API: ecb.frankfurter.app
- BMF filing deadlines: bmf.gv.at/themen/steuern/fristen-verfahren/fristen-faelligkeiten.html
- Austrian KeSt on capital gains (BMF PDF): bmf.gv.at/dam/jcr:.../info_kest_kursgewinne.pdf
