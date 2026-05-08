#!/usr/bin/env python3
"""
Fetch recent posts from Austrian finance subreddits.
Outputs JSON to stdout — no AI calls, no API key needed.

Usage:
    python scripts/fetch_reddit.py
    python scripts/fetch_reddit.py --days 14
    python scripts/fetch_reddit.py --subs Finanzen_AT austria

Install: pip install requests
"""

import argparse
import json
import sys
import time
from datetime import datetime, timedelta, timezone

import requests

DEFAULT_SUBREDDITS = ["Finanzen_AT", "finanzen", "austria", "TradeRepublic"]

KEYWORDS = [
    "kest", "kapitalertrag", "kapitalertragssteuer",
    "steuern depot", "depot steuer", "wertpapier steuer", "dividende steuer",
    "steuererklärung österreich", "steuer österreich",
    "e1kv", "finanzonline",
    "ausschüttungsgleich", "meldefonds", "öekb", "oekb", "thesaurierend steuer",
    "verlustausgleich", "verlustverrechnung",
    "trade republic steuer", "trade republic österreich", "trade republic austria",
    "trade republic kest", "ibkr österreich", "ibkr steuer",
    "interactive brokers österreich", "interactive brokers steuer",
    "scalable capital österreich", "scalable capital steuer",
    "degiro österreich", "degiro steuer", "degiro austria",
    "austrian tax", "austria tax broker", "kest austria",
]


def fetch_subreddit(subreddit: str, days: int) -> list[dict]:
    headers = {"User-Agent": "KestKlar-Fetcher/1.0 (personal research)"}
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
            print(f"[warning] r/{subreddit}: {e}", file=sys.stderr)
            break

        data = resp.json()
        children = data["data"]["children"]
        if not children:
            break

        for child in children:
            p = child["data"]
            created = datetime.fromtimestamp(p["created_utc"], tz=timezone.utc)
            if created < cutoff:
                return posts
            posts.append({
                "id": p["id"],
                "title": p["title"],
                "body": (p.get("selftext") or "")[:800].strip(),
                "url": f"https://www.reddit.com{p['permalink']}",
                "subreddit": subreddit,
                "created": created.strftime("%Y-%m-%d %H:%M UTC"),
                "score": p.get("score", 0),
                "num_comments": p.get("num_comments", 0),
                "flair": p.get("link_flair_text") or "",
            })

        after = data["data"].get("after")
        if not after:
            break
        time.sleep(1.2)

    return posts


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--days", type=int, default=7)
    parser.add_argument("--subs", nargs="+", default=DEFAULT_SUBREDDITS)
    parser.add_argument("--all", action="store_true", help="Skip keyword filter")
    args = parser.parse_args()

    all_posts: list[dict] = []
    for sub in args.subs:
        print(f"Fetching r/{sub}...", file=sys.stderr)
        posts = fetch_subreddit(sub, args.days)
        print(f"  {len(posts)} posts", file=sys.stderr)
        all_posts.extend(posts)
        time.sleep(2)

    if not args.all:
        filtered = [
            p for p in all_posts
            if any(kw in f"{p['title']} {p['body']}".lower() for kw in KEYWORDS)
        ]
        print(f"Keyword filter: {len(all_posts)} → {len(filtered)} posts", file=sys.stderr)
        all_posts = filtered

    print(json.dumps(all_posts, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
