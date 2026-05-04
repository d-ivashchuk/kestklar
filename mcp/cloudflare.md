# Cloudflare MCP

Cloudflare runs the bulk of our infra (R2, Queues, Workflows, KV, Workers, DNS, WAF, Turnstile). They publish 13 official MCP servers; we use the subset relevant to our stack.

- **Transport:** Streamable HTTP, OAuth via `mcp-remote`
- **Status:** GA across the catalog

## Servers we use

| Server | Endpoint | Purpose for KestKlar |
| --- | --- | --- |
| Bindings | `https://bindings.mcp.cloudflare.com/mcp` | Read/create R2 buckets, KV namespaces, Queues, D1, Hyperdrive bindings; required for any Worker that needs new resources |
| Workers Builds | `https://builds.mcp.cloudflare.com/mcp` | Inspect Worker build logs, redeploy from a known good commit |
| Observability | `https://observability.mcp.cloudflare.com/mcp` | Query Workers logs and analytics across `parseBrokerUpload` / `fetchOekbData` Workflows |
| Logpush | `https://logs.mcp.cloudflare.com/mcp` | Configure log shipping to R2 (long-tail debugging beyond Vercel's retention) |
| Browser Rendering | `https://browser.mcp.cloudflare.com/mcp` | Drive headless Chromium for the Phase 2 ÖEKB fallback path; spot-check scraping |
| Docs | `https://docs.mcp.cloudflare.com/mcp` | Look up Workers/Queues/Workflows API behaviour without leaving the editor |
| Radar | `https://radar.mcp.cloudflare.com/mcp` | Verify there's no in-progress incident before chasing a regression |

The remaining six (AI Gateway, Workers AI, AutoRAG, DNS Analytics, Cloudflare One, GraphQL) aren't on our critical path today. Add only if a specific automation needs them.

## Token / auth setup

- Each MCP server uses Cloudflare OAuth scoped to the operator's account + selected zones.
- For unattended automation (CI), create a **Cloudflare API Token** with the minimal permission set per task:
  - `r2:read` for size/health checks
  - `workers:read` + `workers:logs:read` for observability
  - `workers:edit` only for an admin token used during deploys
- Two tokens per environment: `cf-readonly`, `cf-admin`. Production and staging tokens are separate.

## KestKlar automation playbook

1. **Workflow run inspection** — when a `parseBrokerUpload` execution fails, agent uses Observability MCP to pull the step trace + logs and proposes a fix or files an issue.
2. **R2 bucket lifecycle audit** — weekly, agent verifies the `kestklar-uploads` bucket has a 24h lifecycle rule and `jurisdiction: eu` set. Drift = page operator. (Critical for GDPR posture.)
3. **Queue depth alarm** — Observability MCP query of `parse-uploads` queue depth. If > 100 messages and unchanged for 5 min, agent surfaces the stuck consumer.
4. **ÖEKB scraper canary** — nightly, agent triggers a Browser Rendering session against a known ÖEKB fund page, hashes the structural fingerprint, compares to the locked hash. Drift triggers `§15.1` cache freeze in `ARCHITECTURE.md`.
5. **Logpush config check** — confirms Workers logs are shipping to the EU R2 bucket and not to a non-EU sink (compliance posture).

## Caveats

- Bindings MCP can **create resources that cost money** (KV namespaces, Queues, R2 buckets). Guard mutating calls behind operator approval, even though dollar amounts are tiny.
- Workers logs may contain user IPs and headers — apply same "no PII into agent transcripts" rule as the README.
- KV is globally replicated; don't let an automation accidentally store PII there. Bindings MCP can technically write any value to KV.
- Don't use the Cloudflare MCP to issue WAF rule changes during an active incident without a second pair of eyes — easy way to lock yourself out.

Sources:
- [Cloudflare's own MCP servers](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/)
- [Thirteen new MCP servers from Cloudflare](https://blog.cloudflare.com/thirteen-new-mcp-servers-from-cloudflare/)
- [Cloudflare Bindings MCP](https://github.com/cloudflare/mcp-server-cloudflare)
