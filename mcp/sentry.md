# Sentry MCP

Sentry catches runtime errors from Vercel and Cloudflare Workers. The Sentry MCP server gives agents direct access to issues, events, projects, and Seer (their root-cause AI).

- **Remote endpoint:** `https://mcp.sentry.dev/mcp` (OAuth, Streamable HTTP)
- **Local stdio:** `npx @sentry/mcp-server` — uses an auth token from User Settings → Auth Tokens
- **Status:** GA. Cloud endpoint is `sentry.io` only; self-hosted Sentry uses the local stdio variant.

## What we automate

| Capability | Use case in KestKlar |
| --- | --- |
| List issues / events | Triage incoming errors during filing season without opening Sentry UI |
| Inspect a specific issue | Pull the stack trace, breadcrumbs, and tagged context for an error in `parseBrokerUpload` |
| Run a Seer analysis | Get an AI root-cause hypothesis on a flaky parser failure |
| Search across projects | Find related errors across `kestklar-web` (Vercel) and `kestklar-workers` (CF) |
| Manage alerts (where supported) | Tune noisy alerts down without dashboard click-through |

When Claude is asked to "investigate this Sentry alert," the MCP gives it the full event payload — stack trace, request, user (redacted), release, environment — without us pasting screenshots.

## Token / auth setup

- **Operator (interactive):** OAuth on first connect. Tool groups are selected during the OAuth flow — pick only what you need to keep the context window tight.
- **CI / local:** Auth Token from User Settings, scoped to:
  - `event:read`, `project:read`, `org:read` for read-only triage
  - **No `*:write`** for unattended automation — issue resolution should be a human action.
- Two Sentry projects: `kestklar-web` (Next.js / Vercel) and `kestklar-workers` (Cloudflare). MCP scope covers both.

## KestKlar automation playbook

1. **Alert → diagnosis loop** — Sentry alert webhook hits a Vercel route, which prompts Claude with `{issueId}`. Agent uses Sentry MCP to fetch the issue, Vercel MCP to fetch surrounding runtime logs, Cloudflare Observability MCP for upstream Worker context, and posts a candidate root cause to a Slack/email digest.
2. **§15.1 cache-freeze trigger** — when an ÖEKB scraper raises `OEKB_STRUCTURE_DRIFT` (custom error captured in Sentry), agent immediately freezes new `OekbFundData` writes via Cloudflare KV flag and pages on-call.
3. **Release health check** — after `deploy_to_vercel`, agent compares the new release's error rate vs the previous release's first-15-minute baseline. Regression triggers a rollback proposal.
4. **Noisy-alert tuning** — weekly, agent identifies alerts with > 100 events and < 1 user impact, suggests fingerprint or ignore rules.
5. **Tax-rule regression Sentry tag** — every `TaxCalculationResult` write tags Sentry context with `taxYear`, `broker`, `goldenFundCount`. Agent surfaces any error during March–June filing season tagged with golden-fund failures as **P0**.

## Caveats

- **Sentry events can contain PII** — request bodies, user IDs, sometimes raw transaction data if a parser fails before redaction. Configure Sentry's data scrubbing aggressively, and treat MCP-returned event payloads as semi-sensitive.
- **Seer is paid** — running Seer analyses through MCP costs the same as in-dashboard. Don't auto-trigger Seer on every alert; reserve for issues an operator picks.
- **`event:write` and `issue:resolve` are write scopes** — keep them out of unattended tokens. Resolution is a human signal.

Sources:
- [Sentry MCP Server docs](https://docs.sentry.io/product/sentry-mcp/)
- [`getsentry/sentry-mcp-stdio`](https://github.com/getsentry/sentry-mcp-stdio)
