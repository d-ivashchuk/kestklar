# MCP Automation — KestKlar

Each vendor in the architecture that ships an official Model Context Protocol (MCP) server has a dedicated file in this directory describing **what we automate with it, how to wire it up, and what to be careful about**. Goal: Claude (and any other MCP client) can manage as much of the platform as possible without humans clicking around dashboards.

## Coverage

| Vendor | Official MCP | Transport | File |
| --- | --- | --- | --- |
| Vercel | Yes — `https://mcp.vercel.com` | Remote, OAuth | [vercel.md](./vercel.md) |
| Cloudflare | Yes — 13 official servers (Bindings, Workers Builds, Observability, Logpush, Browser, Radar, Docs, AI Gateway, Workers AI, AutoRAG, DNS Analytics, Cloudflare One, GraphQL) | Remote, OAuth | [cloudflare.md](./cloudflare.md) |
| Neon | Yes — `https://mcp.neon.tech` | Remote OAuth or local stdio | [neon.md](./neon.md) |
| Clerk | Yes — remote SDK/docs server + helper libs for our own MCP | Remote, OAuth | [clerk.md](./clerk.md) |
| Stripe | Yes — `https://mcp.stripe.com` | Remote OAuth or local stdio | [stripe.md](./stripe.md) |
| Sentry | Yes — `https://mcp.sentry.dev/mcp` | Remote OAuth or local stdio | [sentry.md](./sentry.md) |
| PostHog | Yes — `https://mcp.posthog.com` | Remote, OAuth | [posthog.md](./posthog.md) |
| GitHub | Yes — official GitHub MCP | Remote, OAuth | [github.md](./github.md) |
| Loops.so | **No first-party MCP** (only third-party Composio/Gumloop wrappers) | — | Skipped — see below |

## What's not covered

- **Loops.so** has no first-party MCP server as of May 2026. Composio and Gumloop offer wrappers, but they introduce a third-party hop for our customer email data. Not worth the trust trade for a vendor we already integrate via REST. Use the Loops REST API directly from Workers/Vercel.
- **Turnstile / Cloudflare DNS / Cloudflare WAF** are managed via the Cloudflare API token used by the Cloudflare MCP servers — no separate MCP needed.
- **Hyperdrive / R2 / Queues / Workflows** — all under the Cloudflare Bindings MCP.

## Operating principles

1. **Read-mostly by default.** Every MCP server below is configured with the narrowest token scope that lets Claude observe state. Mutations (deploy, run migration, charge a customer, edit a feature flag) require an explicit human-in-the-loop confirmation in the calling client.
2. **Two token tiers per vendor.**
   - **`*-readonly`** — used by default agents and CI summaries.
   - **`*-admin`** — used only by an interactive operator session, never by background automation.
3. **Per-environment scoping.** Production and preview/staging use different tokens. No staging token can read or write production.
4. **Audit trail.** Every MCP-mediated mutation goes through the vendor's normal audit log (Vercel deployments, Stripe events, Clerk audit log, etc.). We do not bypass these.
5. **No PII into MCP context.** When an MCP tool returns customer data (e.g. Stripe customer, Clerk user), redact email/name from the agent transcript before persisting it.

## How automation fits into the architecture

Refer to [`../ARCHITECTURE.md`](../ARCHITECTURE.md) for the underlying stack. The MCP layer sits **alongside** the production runtime — it's how engineers (and Claude on their behalf) operate the system. It is not in the request path for end users.

```
End user  ──>  Vercel (Next.js)  ──>  Cloudflare Workers/Workflows  ──>  Neon
                                                                          
Operator  ──>  MCP client (Claude Code / Cursor)  ──>  Vendor MCP servers  ──>  Vendor APIs
```

## Quick setup (Claude Code)

Add to `~/.claude.json` or project `.mcp.json`:

```json
{
  "mcpServers": {
    "vercel":     { "url": "https://mcp.vercel.com" },
    "cloudflare": { "url": "https://bindings.mcp.cloudflare.com/mcp" },
    "neon":       { "url": "https://mcp.neon.tech/mcp" },
    "stripe":     { "url": "https://mcp.stripe.com" },
    "sentry":     { "url": "https://mcp.sentry.dev/mcp" },
    "posthog":    { "url": "https://mcp.posthog.com/mcp" },
    "clerk":      { "url": "https://mcp.clerk.com/mcp" }
  }
}
```

Each remote server uses OAuth on first connect; no API keys in config files.
