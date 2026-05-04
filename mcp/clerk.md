# Clerk MCP

Clerk handles auth. Their MCP server is mostly a docs / SDK-snippet helper today, plus tooling (`@clerk/mcp-tools`) for building MCP-authenticated servers of our own.

- **Remote endpoint:** `https://mcp.clerk.com/mcp` (OAuth)
- **Helper library:** `@clerk/mcp-tools` (npm) — wraps `@modelcontextprotocol/sdk` with Clerk OAuth middleware (`mcpAuthClerk`)
- **Status:** GA for the SDK/docs server; helper lib in active development

## What we automate

| Capability | Use case in KestKlar |
| --- | --- |
| Search Clerk docs / SDK snippets | Quickly look up the right webhook signature verification snippet for our Vercel route |
| Auth implementation patterns | Generate boilerplate for `mcpAuthClerk` middleware if we expose our own MCP later |
| Org / user inspection (where supported) | Confirm a user's plan claim during a support ticket without dashboard click-through |

The Clerk MCP server is **less operationally rich** than Stripe/Sentry today — it shines as a docs/snippets source rather than a control plane. The control plane (block user, force sign-out, rotate session) still happens via Clerk's REST API, called from our own scripts.

## Token / auth setup

- OAuth via remote MCP for interactive use.
- For server-to-server automation against the Clerk API, use a **Clerk Secret Key** stored as a Vercel env var (`CLERK_SECRET_KEY`) — same key the app already uses. No second key needed for automation.

## KestKlar automation playbook

1. **Webhook handler scaffolding** — when adding a new Clerk event (`user.deleted`, `session.revoked`), agent looks up the canonical handler from Clerk MCP and wires it into our Next.js webhook route.
2. **Plan claim audit** — agent compares the set of `User.plan` values in Neon against the corresponding Clerk public metadata via the Clerk REST API (script, not MCP), flags drift.
3. **Future: KestKlar exposes its own MCP** — if/when we offer "let an AI agent run my taxes," `@clerk/mcp-tools` is how we'd auth that endpoint with the user's existing Clerk session. Out of scope until we have v1 shipped.

## Caveats

- The Clerk MCP today is **read-leaning** — don't expect parity with Stripe MCP for mutating user state.
- We integrate Clerk via SDK in `app/`; MCP is a side channel for engineers, not the primary integration.
- Clerk has an audit log — any administrative action via the dashboard or API (whether agent-driven or not) is captured there. Don't bypass it.

Sources:
- [Clerk MCP overview](https://clerk.com/docs/mcp/overview)
- [`clerk/mcp-tools` on GitHub](https://github.com/clerk/mcp-tools)
- [Use Clerk's MCP server](https://clerk.com/docs/guides/ai/mcp/clerk-mcp-server)
