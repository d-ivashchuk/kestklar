# KestKlar

Austrian capital-gains tax (KeSt) automation for non-tax-simple foreign brokers.
Marketing site lives in `app/(marketing)/`; the gated app lives in `app/(app)/`.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full design and
[`mcp/`](./mcp/) for per-vendor automation playbooks.

## Stack at a glance

- **Vercel** — Next.js 15 (App Router), tRPC v11, Clerk auth
- **Cloudflare** — R2 (uploads), Queues + Workflows (parse + ÖEKB), KV (rate limit), Turnstile, DNS/WAF
- **Neon** — Postgres (EU / Frankfurt), Hyperdrive in front of it from Workers
- **Stripe** · **Loops** · **Sentry** · **PostHog** — domain-specific SaaS

## Repo layout

```
app/
  (marketing)/   ← public site (landing, ratgeber, preise, …)
  (app)/         ← Clerk-gated app (/app/*)
    app/         ← /app dashboard
      [year]/    ← year-scoped routes (upload, result)
      settings/
  api/
    trpc/        ← tRPC HTTP handler
    webhooks/    ← Clerk + Stripe webhooks
lib/
  tax/           ← pure-TS calculation engine + tests (highest correctness target)
  oekb/          ← ÖEKB schema, bounds checks, golden canary, fetch (Phase 1)
  parsers/       ← per-broker parsers (stubs — implement per Phase plan)
  trpc/          ← tRPC server + client
  r2.ts          ← R2 presigned-URL helper
  cloudflare/    ← REST clients for queue enqueue, KV ops
  db.ts stripe.ts rate-limit.ts
prisma/
  schema.prisma
workers/
  src/           ← Cloudflare Worker (Queue consumers + Workflows + cron)
  wrangler.toml
mcp/             ← per-vendor MCP automation playbooks
```

## First-time setup

```bash
# 1. Install dependencies
npm install

# 2. Copy .env.example → .env.local and fill in credentials
cp .env.example .env.local

# 3. Generate Prisma client + push schema to Neon (dev branch)
npm run db:generate
npm run db:push

# 4. Run the marketing site + app locally
npm run dev
```

The Worker is independent:

```bash
cd workers
npm install
wrangler dev          # local Worker dev
wrangler deploy       # deploy to Cloudflare
```

## Common scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` over the repo |
| `npm test` | Vitest unit tests (tax engine, ÖEKB sanity) |
| `npm run db:push` | Push Prisma schema to the connected DB |
| `npm run db:studio` | Open Prisma Studio |
| `npm run worker:dev` | `wrangler dev` against local Worker |
| `npm run worker:deploy` | Deploy Worker to Cloudflare |

## What's done vs. what's stubbed

**Real and tested**

- Pure tax-calculation engine (`lib/tax/`) with unit tests for the §15.2 math invariants
- ÖEKB sanity layer (`lib/oekb/sanity.ts` — bounds, fingerprint, in-window date)
- Prisma schema for every model in `ARCHITECTURE.md` §3
- tRPC routers wired end-to-end (uploads, calculations, oekb, billing, user)
- Clerk middleware gating `/app/*`
- App routes (dashboard, upload wizard, result, settings) — wired against tRPC
- R2 presigned-URL helper
- Cloudflare Queue enqueue from Vercel
- Worker scaffold (Workflow classes, queue consumer, cron handler)

**Stubbed (intentionally) — wire in Phase 1/2**

- Per-broker parsers (`lib/parsers/*`) — throw `NOT_IMPLEMENTED`
- ÖEKB scraper (`lib/oekb/fetch.ts`) — schema + sanity ready, scraper landing point marked
- Worker step bodies (`workers/src/parse-broker-upload.ts`, `fetch-oekb-data.ts`) — `step.do` skeleton with TODOs inside each step
- Cloudflare KV rate limiting — returns `true` (allow) until KV is wired
- Stripe + Clerk webhook signature verification — fail-closed if env missing
- Golden fund canary values (`lib/oekb/golden.ts`) — populate after manual cross-check before enabling §15.3 nightly canary

## Operating the app via MCP

Every vendor in the stack except Loops.so ships an official MCP server. Connect
them in your client (`.mcp.json` is committed at repo root). Vendor-specific
playbooks, scopes, and caveats live in [`mcp/`](./mcp/).

## Next steps for first IBKR MVP (`ARCHITECTURE.md` §13 Phase 1)

1. Implement `lib/parsers/ibkr.ts` against IBKR Flex CSV
2. Wire Worker `parse-broker-upload` step bodies (Hyperdrive Postgres client, parser dispatch)
3. Reverse-engineer ÖEKB JSON endpoint and fill `lib/oekb/fetch.ts`
4. Populate `lib/oekb/golden.ts` with manually verified values for 10 ISINs × 3 tax years
5. Wire Stripe Checkout + webhook in production mode
6. Configure Sentry, PostHog, Turnstile keys
