# Vercel MCP

Hosting platform for the Next.js app. The Vercel MCP server lets Claude observe and operate deployments without us touching the dashboard.

- **Endpoint:** `https://mcp.vercel.com`
- **Transport:** Streamable HTTP, OAuth (no API keys in config)
- **Status:** Public Beta on all plans (per Vercel docs)

## What we automate

| Capability | Tool | Use case in KestKlar |
| --- | --- | --- |
| List projects / deployments | `list_projects`, `list_deployments` | Triage a failed prod deploy without opening the dashboard |
| Read deployment build logs | `get_deployment_build_logs` | Debug Next.js build failures from the agent |
| Read runtime logs | `get_runtime_logs` | Inspect Edge / function logs around a Sentry alert timestamp |
| Inspect deployment metadata | `get_deployment` | Confirm which commit is live, check build duration |
| Search docs | `search_vercel_documentation` | Look up framework presets, env var precedence, etc. |
| Trigger deploy | `deploy_to_vercel` | Promote a preview to prod after PR merge — **gated** behind explicit operator confirmation |
| Get protected URL access | `get_access_to_vercel_url` | Pull a preview URL through Vercel SSO when reviewing |

## Token / auth setup

- OAuth on first MCP connect — Vercel issues a session token bound to the operator's account.
- Scope is the operator's existing Vercel team membership; no separate role needed.
- For CI / unattended use, mint a **Vercel Access Token** with project-scoped read permission and configure a local stdio MCP variant. Default to read-only.

## KestKlar automation playbook

1. **PR preview health check** — when a PR opens, agent reads the latest preview deployment status + build logs, posts a one-line summary on the PR.
2. **Post-deploy smoke** — after `deploy_to_vercel`, agent fetches runtime logs for 5 minutes, flags any 5xx or unhandled error, opens a Sentry MCP query if errors are present.
3. **Filing-season scaling check** — daily during March–June, agent pulls function execution metrics + runtime log error rate, posts to a Slack/email digest if either exceeds threshold.
4. **Env var drift** — agent compares production env keys against `.env.example` and flags missing or extra keys after major deploys.

## Caveats

- `deploy_to_vercel` is destructive in the sense that it ships code to users. Never auto-call this from an unattended agent. Default policy: require operator approval per call.
- Build logs may include secret values if a developer accidentally `console.log`'d one — treat log output as semi-sensitive and don't paste into untrusted contexts.
- Runtime logs are sampled on Pro tier; for full fidelity during incidents, use Logpush → Cloudflare R2 (covered in `cloudflare.md`).

Sources:
- [Vercel MCP docs](https://vercel.com/docs/mcp)
- [Use Vercel's MCP server](https://vercel.com/docs/agent-resources/vercel-mcp)
- [MCP explained — Vercel blog](https://vercel.com/blog/model-context-protocol-mcp-explained)
