# GitHub MCP

GitHub hosts the source. Already in use in this very session (the `mcp__github__*` toolset). This file is for completeness and future contributors.

- **Remote endpoint:** GitHub's official MCP server (managed by GitHub)
- **Transport:** Streamable HTTP, OAuth or fine-grained Personal Access Token (PAT)
- **Status:** GA

## What we automate

| Capability | Use case in KestKlar |
| --- | --- |
| Read PRs, issues, commits, files | Agent reviews a PR end-to-end without cloning the repo |
| Open / comment on PRs | Auto-open follow-up PRs (e.g. dependency bumps, regenerated golden fixtures) |
| Search code / issues | Find the broker parser that owns a regression |
| Read CI status, run logs | Diagnose a failed Vercel preview build via the linked CI run |
| Add / resolve review threads | Respond to review feedback iteratively |
| Manage branches | Create the `claude/*` working branches our session conventions use |

## Token / auth setup

- **Repo scope is restricted** by the harness — only `d-ivashchuk/kestklar` is reachable from this session. Don't override that; widening scope reintroduces blast radius.
- For unattended automation (e.g. a webhook-driven agent), mint a **fine-grained PAT** with:
  - `Contents: Read` + `Pull requests: Read & Write` on the single repo
  - `Issues: Read & Write` if you want issue triage
  - **No `Administration` scope.** No org-wide tokens.
- Two tokens: `gh-readonly` for digests, `gh-write` for an interactive operator session.

## KestKlar automation playbook

1. **PR hygiene bot** — agent watches PRs on `claude/*` branches, runs `simplify` review, posts a single concise summary instead of a wall of nits.
2. **CI failure triage** — when CI fails, agent fetches the run log via GitHub MCP, classifies (test/typecheck/lint/build), and either fixes trivially or posts a diagnosis.
3. **Tax-rule regression PR** — when `§15.3` golden canary detects drift, agent opens an issue with the fund + year + observed vs expected, optionally a draft PR updating the golden file with a `RequiresHumanReview` label.
4. **Dependency bump cadence** — monthly, agent inspects `package.json` changes, opens grouped PRs for non-major bumps with the changelog summarised.
5. **Issue → branch → PR** — operator says "fix the IBKR rounding bug from issue #42." Agent reads the issue, creates `claude/fix-ibkr-rounding-<slug>`, drafts the fix, opens the PR.

## Caveats

- **Force-push is destructive.** Agents must never `--force` push to `main` or to a branch with open review comments. Default to `--force-with-lease` only when explicitly asked.
- **Don't open PRs unprompted.** Per session policy: only create a PR when the user explicitly asks.
- **Comments are visible to the world** on public repos. Treat agent-authored review comments with the same care as human ones — terse, accurate, no internal jargon.
- **CI logs may include secrets** if a workflow leaked one. Treat run logs as semi-sensitive.

Sources:
- [GitHub MCP server (official)](https://github.com/github/github-mcp-server)
- [Model Context Protocol docs](https://modelcontextprotocol.io/)
