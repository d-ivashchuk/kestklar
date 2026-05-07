# KestKlar

Austrian capital-gains tax (KeSt) automation for non-tax-simple foreign brokers.
Marketing site lives in `app/(marketing)/`; the gated app lives in `app/(app)/`.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full design and
[`mcp/`](./mcp/) for per-vendor automation playbooks.

## Closed-beta status

What works **end-to-end** today:

- Sign up at `/sign-up` (Clerk free tier)
- `/app` → year picker → upload an **Interactive Brokers Activity Statement CSV**
- Parser extracts trades, dividends, withholding tax, interest
- ECB rates fetched per (currency, date) for FX conversion
- Held positions surfaced on the year dashboard with a panel to **paste ÖEKB
  per-unit values** (the auto-fetcher lands later — see "Phase 2" below)
- `/app/[year]/result` runs the tax engine and shows real KZ 937 / 985 / 994 /
  996 / 998 plus net KeSt
- Every beta user is auto-set to plan `PRO` — Stripe is dormant

Brokers other than IBKR are stubs (see `lib/parsers/*`). The `workers/`
Cloudflare directory and the R2 presign code are kept in tree for the future
async-parse migration but are not on the closed-beta path.

## Stack at a glance

- **Vercel** — Next.js 16 (App Router), tRPC v11, Clerk auth, Prisma → Neon
- **Neon** — Postgres (EU / Frankfurt). Free tier is enough for beta.
- **ECB** — FX rates via Frankfurter (no auth, no key)
- **Cloudflare** — R2 / Queues / Workflows scaffold for Phase 2 (currently dormant)
- **Stripe / Loops / Sentry / PostHog** — wired in code, disabled during beta

## Repo layout

```
app/
  (marketing)/   ← public site
  (app)/         ← Clerk-gated app (/app/*)
  (auth)/        ← /sign-in and /sign-up pages
  api/
    upload/      ← synchronous parse: POST multipart → DB rows
    trpc/        ← tRPC HTTP handler
    webhooks/    ← Clerk + Stripe (Stripe dormant during beta)
lib/
  tax/           ← pure-TS calculation engine + Vitest unit tests
  parsers/       ← IBKR (real); Scalable/DEGIRO/TR (stubs)
  fx/            ← ECB rate resolver via Frankfurter
  oekb/          ← schema, sanity, golden canary, fetch (stub)
  trpc/          ← server + client + 5 routers
prisma/schema.prisma
workers/         ← Cloudflare Worker scaffold (dormant during beta)
mcp/             ← per-vendor MCP automation playbooks
```

## Local dev

```bash
# 1. Install deps (postinstall runs `prisma generate`)
npm install

# 2. Copy .env.example → .env.local and fill in DATABASE_URL + Clerk keys
cp .env.example .env.local

# 3. Push schema to your Neon dev branch
npm run db:push

# 4. Run
npm run dev          # → http://localhost:3000
```

You only need three env vars to boot: `DATABASE_URL`, `CLERK_SECRET_KEY`,
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. Everything else is optional during beta.

### Common scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (44 tests: tax engine, IBKR parser, ÖEKB sanity) |
| `npm run db:push` | Push Prisma schema to the connected DB |
| `npm run db:studio` | Open Prisma Studio |

## Deploy to Vercel + Neon for first beta users

This is the recommended path — gets you a live URL in under 30 minutes with
free tiers for everything.

### 1. Create accounts (5 min)

- **Neon** — https://console.neon.tech → New project, region "Frankfurt (EU central)"
- **Clerk** — https://dashboard.clerk.com → New application; in "Email, Phone,
  Username" enable **Email** as the only sign-in identifier (simplest UX)
- **Vercel** — https://vercel.com → connect this GitHub repo

### 2. Push schema to Neon (2 min)

```bash
DATABASE_URL='postgres://...neon.tech/...?sslmode=require' npx prisma db push
```

### 3. Configure Vercel env vars (5 min)

In Vercel project settings → Environment Variables, set for **Production**:

```
DATABASE_URL=postgres://...neon.tech/...?sslmode=require
CLERK_SECRET_KEY=sk_live_xxx          # from Clerk dashboard → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/app
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/app
NEXT_PUBLIC_APP_URL=https://kestklar.at  # or your Vercel preview URL
```

Leave Stripe / R2 / Cloudflare / Sentry blank.

### 4. (Optional) Wire the Clerk → DB email-sync webhook (5 min)

Without this, the app works but `User.email` stays NULL.

In Clerk dashboard → Webhooks → Add endpoint:
- URL: `https://your-domain.vercel.app/api/webhooks/clerk`
- Events: `user.created`, `user.updated`, `user.deleted`
- Copy the signing secret into Vercel as `CLERK_WEBHOOK_SECRET`

### 5. Deploy (1 min)

`git push` — Vercel builds and deploys on every push to your main branch.

### 6. Hand to your first user

Give them the URL and these three steps:

1. Sign up at `/sign-up`
2. Configure an **IBKR Flex Query** with these sections enabled — Trades
   (with the **ISIN** column!), Dividends, Withholding Tax, Interest — for the
   tax year(s) you want to file. Export as CSV.
3. Upload at `/app/<year>/upload`, paste the ÖEKB per-unit values for any
   ETFs you held, click "Berechnen". The result page shows the exact lines
   to paste into your E1kv.

## Tax engine correctness

Pure-TS modules in `lib/tax/` with Vitest unit tests covering the §15.2
invariants from `ARCHITECTURE.md`:

| Module | What it does |
| --- | --- |
| `position.ts` | Gleitender Durchschnittspreis position tracker (BUY/SELL) |
| `deemed-distribution.ts` | KZ 937: perUnit × qty × FX |
| `loss-netter.ts` | Pools all realised gains/losses → KZ 994 / KZ 996 |
| `withholding.ts` | KZ 998 capped at 27.5% of foreign dividend gross |
| `e1kv.ts` | Final assembler — invariants enforced at the boundary |
| `run.ts` | Orchestrator: DB → engine → TaxCalculationResult (append-only) |

`npm test` runs them all; 44 tests, all green at the time of this commit.

## Phase 2 — what's deferred

- **ÖEKB auto-fetcher** (`lib/oekb/fetch.ts`) — schema + sanity layer ready;
  the actual scraper throws `NOT_IMPLEMENTED`. Beta users paste values
  manually for now (it takes 30 seconds per fund per year).
- **Per-broker parsers** for Scalable Capital, DEGIRO, Trade Republic.
- **Cloudflare Worker async-parse** — `workers/` directory has the wrangler
  config + Workflow skeletons; we'll switch over once files exceed Vercel's
  4.5 MB body limit or when parsing needs more than 60 seconds.
- **Stripe Checkout** — `lib/stripe.ts` + the billing tRPC router are written
  but not surfaced in the UI during the closed beta.
- **PDF parsers** — only CSV is wired today (it's IBKR's recommended export
  format anyway).

## Operating the app via MCP

Every vendor in the stack except Loops.so ships an official MCP server.
`.mcp.json` is committed at repo root. Vendor-specific playbooks, scopes,
and caveats live in [`mcp/`](./mcp/).
