#!/usr/bin/env python3
"""
Fetch recent posts from Austrian finance subreddits.
Outputs JSON to stdout — no AI calls needed.

Requires Reddit OAuth2 app-only credentials:
  export REDDIT_CLIENT_ID=...
  export REDDIT_CLIENT_SECRET=...

Create a free app at https://www.reddit.com/prefs/apps
  - Type: "script"
  - Redirect URI: http://localhost:8080

Usage:
    python scripts/fetch_reddit.py
    python scripts/fetch_reddit.py --days 14
    python scripts/fetch_reddit.py --subs FinanzenAT austria
    python scripts/fetch_reddit.py --comments --comment-limit 8

Install: pip install requests
"""

import argparse
import json
import os
import sys
import time
from datetime import datetime, timedelta, timezone

import requests

DEFAULT_SUBREDDITS = ["FinanzenAT", "finanzen", "austria", "TradeRepublic"]
USER_AGENT = "script:kestklar-opportunity-finder:v1.1 (by u/kestklar_dev)"

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


def get_token(client_id: str, client_secret: str) -> str:
    resp = requests.post(
        "https://www.reddit.com/api/v1/access_token",
        auth=(client_id, client_secret),
        data={"grant_type": "client_credentials"},
        headers={"User-Agent": USER_AGENT},
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


def api_get(token: str, path: str, params: dict | None = None) -> dict:
    resp = requests.get(
        f"https://oauth.reddit.com{path}",
        headers={"Authorization": f"Bearer {token}", "User-Agent": USER_AGENT},
        params=params,
        timeout=15,
    )
    resp.raise_for_status()
    return resp.json()


def fetch_subreddit(token: str, subreddit: str, days: int) -> list[dict]:
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    posts: list[dict] = []
    after: str | None = None

    while True:
        params = {"limit": 100}
        if after:
            params["after"] = after

        try:
            data = api_get(token, f"/r/{subreddit}/new", params)
        except requests.RequestException as e:
            print(f"[warning] r/{subreddit}: {e}", file=sys.stderr)
            break

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
        time.sleep(1.0)

    return posts


def fetch_comments(token: str, post: dict, limit: int) -> list[dict]:
    try:
        data = api_get(token, f"/comments/{post['id']}", {"limit": limit, "sort": "confidence"})
    except requests.RequestException as e:
        print(f"[warning] comments {post['id']}: {e}", file=sys.stderr)
        return []

    if len(data) < 2:
        return []

    comments: list[dict] = []
    for child in data[1]["data"].get("children", []):
        if child.get("kind") != "t1":
            continue
        c = child["data"]
        body = (c.get("body") or "").strip()
        if not body or body in {"[deleted]", "[removed]"}:
            continue
        comments.append({
            "id": c["id"],
            "author": c.get("author") or "",
            "score": c.get("score", 0),
            "created": datetime.fromtimestamp(c["created_utc"], tz=timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
            "body": body[:1000],
            "url": f"{post['url']}{c['id']}/",
        })
        if len(comments) >= limit:
            break

    return comments


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--days", type=int, default=7)
    parser.add_argument("--subs", nargs="+", default=DEFAULT_SUBREDDITS)
    parser.add_argument("--all", action="store_true", help="Skip keyword filter")
    parser.add_argument("--comments", action="store_true")
    parser.add_argument("--comment-limit", type=int, default=8)
    args = parser.parse_args()

    client_id = os.environ.get("REDDIT_CLIENT_ID")
    client_secret = os.environ.get("REDDIT_CLIENT_SECRET")
    if not client_id or not client_secret:
        print(
            "Error: set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET.\n"
            "Create a free Reddit app at https://www.reddit.com/prefs/apps (type: script)",
            file=sys.stderr,
        )
        sys.exit(1)

    print("Authenticating with Reddit...", file=sys.stderr)
    token = get_token(client_id, client_secret)

    all_posts: list[dict] = []
    for sub in args.subs:
        print(f"Fetching r/{sub}...", file=sys.stderr)
        posts = fetch_subreddit(token, sub, args.days)
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

    if args.comments:
        for post in all_posts:
            print(f"Fetching comments for {post['id']}...", file=sys.stderr)
            post["comments"] = fetch_comments(token, post, args.comment_limit)
            time.sleep(1.0)

    print(json.dumps(all_posts, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
