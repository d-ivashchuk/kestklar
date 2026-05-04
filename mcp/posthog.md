# PostHog MCP

PostHog runs product analytics and feature flags on the EU cloud. Their MCP server proxies to your project — no analytics data is duplicated to PostHog's MCP infrastructure.

- **Remote endpoint:** `https://mcp.posthog.com` / `https://mcp.posthog.com/mcp`
- **Transport:** Streamable HTTP, OAuth
- **Status:** GA. **Free** to use — calling MCP tools doesn't add to the PostHog bill.

## What we automate

| Capability | Use case in KestKlar |
| --- | --- |
| Query events / insights | "How many users completed the IBKR upload flow last week?" — without building a dashboard |
| Create / read / toggle feature flags | Roll out a new broker parser to 10% → 50% → 100%, all from chat |
| Run experiments | A/B test pricing copy on `/preise`; agent reads the result once it reaches significance |
| Read funnels / retention | Spot funnel drop-offs in the upload wizard during filing season |
| Manage cohorts | Build a "Phase 1 IBKR users" cohort to target a Loops sequence |

## Token / auth setup

- OAuth via remote MCP — honours the operator's PostHog project role.
- For unattended use, mint a **Personal API Key** scoped to one project (`kestklar-prod` or `kestklar-staging`):
  - `project:read` + `feature_flag:read` for the default agent
  - `feature_flag:write` only for an explicit operator session managing rollouts
- EU cloud only — `https://eu.posthog.com` — keys from US PostHog won't work.

## KestKlar automation playbook

1. **Feature flag rollout** — operator says "ship the DEGIRO parser to 10%." Agent toggles the `degiro_parser` flag's rollout percentage via PostHog MCP, posts confirmation. Bumps to 50%, then 100% after error budget holds.
2. **Funnel monitoring** — daily, agent queries the `upload-started → upload-parsed → calc-complete` funnel. Conversion drop > 5% triggers a Sentry MCP cross-check.
3. **Pricing experiment readout** — agent watches the `/preise` A/B test and surfaces the result when statistical significance is reached.
4. **Onboarding cohort sync** — agent identifies users who completed `calc-complete` last week, hands the cohort to Loops via REST for a "rate us" sequence.
5. **Killswitch flag check** — every deploy, agent verifies the `oekb_scraper_enabled` flag is still on. If a previous incident left it off, surface that.

## Caveats

- **Feature flag writes can change user-visible behaviour instantly.** Always operator-confirmed; never an unattended decision.
- **Cookieless mode + EU cloud** is configured at SDK level — the MCP doesn't override that. Don't enable EU→US data forwarding via any MCP-exposed setting.
- **Events queried via MCP can include user IDs.** Cohort exports especially. Keep them inside agent context, never paste into external tools.
- PostHog's MCP runs against your live project — there's no read-replica. Bad queries can be expensive on large event volumes; the agent should prefer pre-built insights over raw event scans.

Sources:
- [PostHog MCP docs](https://posthog.com/docs/model-context-protocol)
- [`PostHog/mcp` on GitHub](https://github.com/PostHog/mcp)
- [Machine copy/paste — PostHog blog](https://posthog.com/blog/machine-copy-paste-mcp-intro)
