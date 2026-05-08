#!/usr/bin/env python3
"""
KestKlar — Reddit Opportunity Finder

Crawls relevant subreddits weekly and finds posts where the KestKlar maker
can add genuine value by answering questions about Austrian investment taxes.

Usage:
    python scripts/reddit_opportunities.py

Requirements:
    pip install anthropic requests

Environment:
    ANTHROPIC_API_KEY — get one at https://console.anthropic.com/
"""

import json
import os
import sys
import time
from datetime import datetime, timedelta, timezone

import anthropic
import requests


# ── Config ────────────────────────────────────────────────────────────────────

SUBREDDITS = [
    "Finanzen_AT",   # primary — Austrian personal finance
    "finanzen",      # secondary — large German-language community (~375k members)
    "austria",       # tertiary — general Austrian subreddit
    "TradeRepublic", # niche — lots of AT/DE users asking tax questions
]

# Model to use for AI analysis.
# claude-opus-4-7  → highest quality, ~$0.10–0.30 per weekly run
# claude-haiku-4-5 → good quality, ~$0.01–0.03 per weekly run (switch for cost)
MODEL = "claude-opus-4-7"

# How many days back to search
DAYS_BACK = 7

# Only include posts with AI relevance score >= this threshold
MIN_SCORE = 6

# Austrian tax / broker keywords for fast pre-filter before sending to AI
KEYWORDS = [
    # Tax terms
    "kest", "kapitalertrag", "kapitalertragssteuer", "kest berechnen",
    "steuern depot", "depot steuer", "wertpapier steuer", "dividende steuer",
    "steuererklärung österreich", "steuer österreich broker",
    # Austrian forms & portals
    "e1kv", "finanzonline", "einkommensteuererklärung",
    # ETF-specific Austrian complexity
    "ausschüttungsgleich", "meldefonds", "öekb", "oekb", "thesaurierend steuer",
    # Cross-broker
    "verlustausgleich", "verlustverrechnung",
    # Brokers used by Austrians without auto-withholding
    "trade republic steuer", "trade republic österreich", "trade republic austria",
    "trade republic kest", "ibkr österreich", "ibkr steuer", "interactive brokers österreich",
    "interactive brokers steuer", "scalable capital österreich", "scalable capital steuer",
    "degiro österreich", "degiro steuer", "degiro austria",
    # English variants
    "austrian tax", "austria tax broker", "kest austria",
]


# ── Reddit fetching ───────────────────────────────────────────────────────────

def fetch_posts(subreddit: str, days: int = DAYS_BACK) -> list[dict]:
    """Fetch posts from the last N days using Reddit's public JSON API."""
    headers = {
        "User-Agent": "KestKlar-OpportunityFinder/1.0 (personal research tool)"
    }
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    posts: list[dict] = []
    after: str | None = None

    while True:
        url = f"https://www.reddit.com/r/{subreddit}/new.json?limit=100"
        if after:
            url += f"&after={after}"

        try:
            resp = requests.get(url, headers=headers, timeout=15)
            resp.raise_for_status()
        except requests.RequestException as e:
            print(f"  [warning] failed to fetch r/{subreddit}: {e}")
            break

        data = resp.json()
        children = data["data"]["children"]
        if not children:
            break

        for child in children:
            p = child["data"]
            created = datetime.fromtimestamp(p["created_utc"], tz=timezone.utc)
            if created < cutoff:
                # Reached older posts — we're done with this subreddit
                return posts

            posts.append({
                "id": p["id"],
                "title": p["title"],
                "body": (p.get("selftext") or "")[:600].strip(),
                "url": f"https://www.reddit.com{p['permalink']}",
                "subreddit": subreddit,
                "created": created.strftime("%Y-%m-%d %H:%M UTC"),
                "score": p.get("score", 0),
                "num_comments": p.get("num_comments", 0),
                "flair": p.get("link_flair_text") or "",
                "author": p.get("author", ""),
            })

        after = data["data"].get("after")
        if not after:
            break

        time.sleep(1.2)  # Reddit's public API: be polite

    return posts


# ── Filtering ─────────────────────────────────────────────────────────────────

def keyword_filter(posts: list[dict]) -> list[dict]:
    """
    Fast pre-filter before sending to AI.
    Keeps posts that mention at least one relevant keyword.
    """
    relevant = []
    for p in posts:
        text = f"{p['title']} {p['body']}".lower()
        if any(kw in text for kw in KEYWORDS):
            relevant.append(p)
    return relevant


# ── AI analysis ───────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are an assistant helping the sole developer of KestKlar — an Austrian
investment tax calculator — identify Reddit posts where he can add genuine value
by answering questions honestly, without sounding promotional.

KestKlar context (still in development / waitlist phase):
- Solves: KeSt (Kapitalertragssteuer) for Austrians at non-Austrian brokers
- Handles: ETF ausschüttungsgleiche Erträge (ÖEKB Meldefonds data), cross-broker
  Verlustausgleich, foreign withholding tax credits, exact E1kv line numbers
- Supported brokers: Trade Republic, Interactive Brokers, Scalable Capital, DEGIRO
- Price: €29/yr basic (vs €150–300 Steuerberater) — but free tier shows totals
- Data: stored in Germany, PDFs deleted after parsing, no ads

Your job is to find posts where the developer can be genuinely helpful first,
and only mention KestKlar if it's natural and non-spammy."""


def analyze_batch(posts: list[dict], client: anthropic.Anthropic) -> list[dict]:
    """Send a batch of posts to Claude for opportunity scoring."""
    if not posts:
        return []

    posts_formatted = "\n\n---\n\n".join(
        f"POST {i + 1}  |  r/{p['subreddit']}  |  {p['created']}\n"
        f"Title: {p['title']}\n"
        f"Body: {p['body'] if p['body'] else '(no text body)'}\n"
        f"Link: {p['url']}"
        for i, p in enumerate(posts)
    )

    prompt = f"""Analyze each Reddit post below and decide if it's a good opportunity for the
KestKlar developer to reply with genuine help.

Scoring guide (relevance_score 1–10):
- 9–10: User is stuck on the exact problem KestKlar solves (KeSt calculation, E1kv,
        ausschüttungsgleiche Erträge, Verlustausgleich at non-AT broker)
- 7–8:  User is asking about Austrian investment taxes or complaining about the process
- 5–6:  Tangentially related (broker choice, general AT investing taxes)
- 1–4:  Not really relevant

Only return posts with relevance_score >= {MIN_SCORE}.

For each qualifying post, give:
1. A concrete, specific "helpful_answer" — the actual substance of what to say in
   a comment. Not "explain how it works" but the real explanation itself (2–4 sentences).
   This is what the developer will use to draft the comment.
2. Whether mentioning KestKlar feels natural here (mention_tool: true/false).
   Natural = the user is complaining about exactly the pain KestKlar solves.
   Unnatural = the user is asking something KestKlar doesn't directly address.
3. urgency: "high" (deadline soon / user is frustrated), "medium", "low"

Return ONLY a valid JSON array, no other text. Example structure:
[
  {{
    "post_number": 1,
    "relevance_score": 8,
    "reason": "User is asking exactly how to calculate KeSt for IBKR ETFs",
    "helpful_answer": "For ETFs at non-AT brokers you need the ÖEKB Meldefonds data. Go to oekb.at, find your ISIN, and look for 'ausschüttungsgleiche Erträge' for the tax year. Multiply that per-unit amount by your units held on Dec 31. That's your additional income to declare on E1kv line 898.",
    "mention_tool": true,
    "urgency": "medium"
  }}
]

If no posts qualify, return [].

Posts to analyze:
{posts_formatted}"""

    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=3000,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = response.content[0].text.strip()

        # Extract JSON array even if Claude wraps it in markdown
        start = raw.find("[")
        end = raw.rfind("]") + 1
        if start == -1:
            return []

        parsed = json.loads(raw[start:end])

        # Merge AI fields back into original post dicts
        results = []
        for opp in parsed:
            idx = int(opp.get("post_number", 0)) - 1
            if 0 <= idx < len(posts):
                results.append({**posts[idx], **opp})
        return results

    except (json.JSONDecodeError, IndexError, anthropic.APIError) as e:
        print(f"  [warning] AI analysis failed: {e}")
        return []


# ── Output ────────────────────────────────────────────────────────────────────

URGENCY_ICON = {"high": "[HIGH]", "medium": "[MED] ", "low": "[LOW] "}


def print_results(opportunities: list[dict]) -> None:
    if not opportunities:
        print("\nNo actionable opportunities found this week.")
        return

    print(f"\n{'=' * 65}")
    print(f"  {len(opportunities)} OPPORTUNITIES FOUND")
    print(f"{'=' * 65}")

    for i, opp in enumerate(opportunities, 1):
        urgency = URGENCY_ICON.get(opp.get("urgency", "low"), "[???]")
        tool_tag = "✓ mention KestKlar" if opp.get("mention_tool") else "✗ just help"
        score = opp.get("relevance_score", "?")

        print(f"\n#{i}  {urgency}  [{score}/10]  r/{opp['subreddit']}")
        print(f"  Title  : {opp['title']}")
        print(f"  Date   : {opp['created']}  |  {opp['num_comments']} comments")
        print(f"  URL    : {opp['url']}")
        print(f"  Why    : {opp.get('reason', '')}")
        print(f"  Answer : {opp.get('helpful_answer', '')}")
        print(f"  Tool   : {tool_tag}")


def save_results(opportunities: list[dict], path: str = "reddit_opportunities.json") -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(opportunities, f, ensure_ascii=False, indent=2)
    print(f"\nResults saved to {path}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main() -> None:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set.")
        print("Set it with: export ANTHROPIC_API_KEY=your-key-here")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    print(f"KestKlar — Reddit Opportunity Finder")
    print(f"Searching last {DAYS_BACK} days  |  Model: {MODEL}")
    print("=" * 50)

    # 1. Fetch posts from all subreddits
    all_posts: list[dict] = []
    for subreddit in SUBREDDITS:
        print(f"Fetching r/{subreddit}...", end=" ", flush=True)
        posts = fetch_posts(subreddit)
        print(f"{len(posts)} posts in last {DAYS_BACK} days")
        all_posts.extend(posts)
        time.sleep(2)  # Polite gap between subreddits

    print(f"\nTotal posts collected : {len(all_posts)}")

    # 2. Quick keyword pre-filter
    filtered = keyword_filter(all_posts)
    print(f"Keyword-relevant posts: {len(filtered)}")

    if not filtered:
        print("\nNothing keyword-relevant found this week. Try again next week.")
        return

    # 3. AI analysis in batches of 8 (keeps prompts manageable)
    print(f"\nSending {len(filtered)} posts to Claude for analysis...")
    opportunities: list[dict] = []
    batch_size = 8
    total_batches = -(-len(filtered) // batch_size)  # ceiling division

    for i in range(0, len(filtered), batch_size):
        batch_num = i // batch_size + 1
        batch = filtered[i : i + batch_size]
        print(f"  Batch {batch_num}/{total_batches}...", end=" ", flush=True)
        results = analyze_batch(batch, client)
        print(f"{len(results)} qualifying post(s)")
        opportunities.extend(results)
        if i + batch_size < len(filtered):
            time.sleep(0.5)

    # 4. Sort by relevance score, then urgency
    urgency_rank = {"high": 0, "medium": 1, "low": 2}
    opportunities.sort(
        key=lambda x: (
            -x.get("relevance_score", 0),
            urgency_rank.get(x.get("urgency", "low"), 2),
        )
    )

    # 5. Print and save
    print_results(opportunities)
    if opportunities:
        save_results(opportunities)


if __name__ == "__main__":
    main()
