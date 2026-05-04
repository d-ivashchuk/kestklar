# Neon MCP

Postgres is the source of truth for `Transaction`, `Position`, `OekbFundData`, and `TaxCalculationResult`. The Neon MCP server lets us run schema operations and read data through Claude — without ever opening a SQL console in production.

- **Remote endpoint:** `https://mcp.neon.tech/mcp` (OAuth)
- **Local stdio:** `npx -y neonctl@latest init` configures the MCP server with API-key auth for compatible clients
- **Status:** GA. Neon flags MCP for **dev/staging/IDE workflows**, not unattended production access.

## What we automate

| Capability | Use case in KestKlar |
| --- | --- |
| List projects / branches | Confirm prod vs preview branch state during a release |
| Create branch | Spin up a throwaway branch for a risky migration test |
| Run SQL | Read-only data inspection (`SELECT count(*) FROM "OekbFundData" WHERE "fetchedAt" > now() - interval '1 day'`) |
| Apply schema migration via branch | Apply Prisma migration to a branch first, diff the schema, then promote |
| Reset a branch | Drop dev branch and recreate from prod snapshot for clean repro |
| Inspect query stats | Spot a slow query during filing season before it cascades |

## Token / auth setup

- **Operator (interactive):** OAuth via remote MCP. Tied to the engineer's Neon account; honours their RBAC.
- **CI / unattended (limited):** Neon API key with **read-only** scope for the prod project. Never use a write key in unattended automation.
- Two Neon projects: `kestklar-prod`, `kestklar-staging`. MCP tokens are project-scoped.
- Branch-per-PR pattern: each preview deploy runs against its own Neon branch, agent can freely mutate those.

## KestKlar automation playbook

1. **Migration safety review** — before merging a Prisma migration PR, agent applies it to a fresh branch via MCP, diffs the resulting schema against prod, posts the diff to the PR.
2. **ÖEKB cache health** — daily query of `OekbFundData` row count, oldest `fetchedAt`, and missing-ISIN count. Surface to operator if cache hit rate drops below 95%.
3. **Reproducible bug investigation** — when a user disputes a calculation, agent creates a branch from prod, queries the user's `Transaction` + `OekbFundData` rows, walks through the §15.5 audit trail without touching prod.
4. **Schema drift check** — compare prod schema vs `prisma/schema.prisma` in the repo; flag drift (someone applied a migration outside the pipeline).
5. **Slow query digest** — weekly summary of pg_stat_statements top 10 by total time. Agent suggests indexes for repeat offenders.

## Caveats

- **Neon explicitly recommends MCP for dev/IDE, not production.** Treat any prod-scoped MCP token as you would `psql -U postgres` access. Read-only by default; mutations require operator confirmation.
- **No raw SQL execution from background agents.** SQL through MCP is a sharp tool — agents that have it can drop tables. Only an attended session with `cf-admin`-equivalent context should mutate prod data.
- **Branches consume compute.** Cleaning up old preview branches must be automated (via the same MCP) or the Neon bill creeps. Agent runs a weekly "delete branches older than 14 days with no recent activity" job — staging only, never prod or main.
- Pulling tax data via SQL is a GDPR access — log every read by the agent against the audit trail in §15.5 of `ARCHITECTURE.md`.

Sources:
- [Neon MCP Server overview](https://neon.com/docs/ai/neon-mcp-server)
- [neondatabase/mcp-server-neon (GitHub)](https://github.com/neondatabase/mcp-server-neon)
