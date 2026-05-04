# Stripe MCP

Stripe handles one-time annual KeSt payments. The Stripe MCP server exposes the customer/payment/billing API plus a docs search to AI agents.

- **Remote endpoint:** `https://mcp.stripe.com` (OAuth)
- **Local stdio:** `npx -y @stripe/mcp --tools=all --api-key=YOUR_STRIPE_SECRET_KEY`
- **Auth model:** OAuth for hosted; **Restricted API Key (RAK)** for local. Tool permissions follow the RAK's scope.
- **Status:** GA, listed in the official MCP Registry

## What we automate

| Capability | Use case in KestKlar |
| --- | --- |
| Search customers / invoices / products | Look up a paying user during a support ticket without opening dashboard |
| Create coupons | Issue one-off discount codes for partners (Steuerberater referrals, Phase 4) |
| List / inspect subscriptions | We sell one-time per year — confirm a customer's purchase status during disputes |
| Search across objects | Find a payment intent given a fragment of an email or amount |
| Search Stripe docs | Look up the right webhook event name, integration pattern, etc. |

## Token / auth setup

- **Operator (interactive):** OAuth via remote MCP. Honours the operator's Stripe team role.
- **Local / scripted:** create a **Restricted API Key** at `https://dashboard.stripe.com/apikeys`:
  - **`stripe-readonly`** — RAK with read-only on customers, invoices, products. Default for any agent.
  - **`stripe-coupons`** — RAK with read on customers + write on coupons only. For partner discount issuance.
  - **No general-purpose write RAK** for unattended automation — refunds, charge cancellations, customer deletions stay manual.
- Test mode and live mode keys are **separate**. CI uses test mode only.

## KestKlar automation playbook

1. **Support triage** — given a customer email, agent fetches: latest payment intent, subscription/one-time purchase history, any failed webhooks. Returns a single-screen summary.
2. **Failed-webhook reconciliation** — daily, agent compares Stripe `customer.created` events vs `User` rows in Neon. Mismatch = webhook delivery failure or downstream bug; opens an issue.
3. **Coupon issuance for Steuerberater partners** (Phase 4) — agent creates a single-use 50% coupon scoped to a partner's referral code, returns the code via Loops email.
4. **Revenue/MRR digest** — weekly automated summary across the search API, no human in dashboard required.
5. **Docs lookup during integration work** — Stripe docs MCP avoids stale answers when wiring Checkout, Customer Portal, webhook signing.

## Caveats

- **`coupons.create` and any write tool can move money.** Even with a coupon-scoped RAK, a misissued 100%-off code is a real loss. Agent must confirm the discount % and recipient before each call.
- **PII discipline:** Stripe customer objects include `email`, `name`, sometimes `address`. Don't paste the raw object into model context unless redacted; never log it to a non-EU sink.
- **Test vs live confusion is the #1 footgun.** Use distinct MCP server entries per mode (`stripe-test`, `stripe-live`) and never use OAuth that spans both.
- Webhook signature verification is **never** bypassed. The MCP can't sign or replay webhooks; if you need that for testing, use the Stripe CLI locally.

Sources:
- [Stripe MCP docs](https://docs.stripe.com/mcp)
- [Build on Stripe with AI](https://docs.stripe.com/building-with-ai)
- [Official Stripe MCP — PulseMCP](https://www.pulsemcp.com/servers/stripe-agent-toolkit)
