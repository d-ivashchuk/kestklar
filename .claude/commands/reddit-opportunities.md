# Reddit Opportunity Finder for KestKlar

Find Reddit posts where the KestKlar founder can add genuine value this week.

## Step 1 — Fetch posts

Run:
```
python scripts/fetch_reddit.py
```

If the script is missing dependencies, run `pip install requests` first.
Capture the JSON output.

## Step 2 — Analyze for opportunities

You are helping the sole developer of **KestKlar** — an Austrian investment tax
calculator (still in development, waitlist at kestklar.at).

**What KestKlar solves:**
- Calculates KeSt (Kapitalertragssteuer) for Austrians using non-Austrian brokers
- Handles ETF ausschüttungsgleiche Erträge from ÖEKB Meldefonds data automatically
- Cross-broker Verlustausgleich and foreign withholding tax credit (Quellensteueranrechnung)
- Outputs exact E1kv line numbers ready to paste into FinanzOnline
- Supported brokers: Trade Republic, Interactive Brokers, Scalable Capital, DEGIRO
- Pricing: free tier (see totals), €29/yr basic, €69/yr pro
- Privacy: data on German servers, PDFs deleted after parsing, no ads

**Your job:** Read the fetched posts and identify genuine reply opportunities.

For each post, score it 1–10:
- **9–10**: User is stuck on the exact problem KestKlar solves (E1kv, ÖEKB lookup,
  Verlustausgleich across brokers, ausschüttungsgleiche Erträge calculation)
- **7–8**: User is asking about Austrian investment taxes or complaining about the manual work
- **5–6**: Tangentially related (broker choice, general AT taxes, confusion about process)
- **1–4**: Not relevant

**Only surface posts scoring 6 or higher.**

## Step 3 — Output format

For each qualifying post, produce:

```
#N  [SCORE/10]  [URGENCY]  r/SUBREDDIT
Title  : <post title>
URL    : <link>
Date   : <created>  |  <num_comments> comments
Why    : <one sentence: why this is a good opportunity>
Answer : <the actual comment to write — specific, helpful, 3-5 sentences of real
          content, not generic advice. Include concrete steps, numbers, or links
          to oekb.at where appropriate.>
Tool   : <"✓ mention KestKlar naturally" or "✗ just be helpful, no mention">
```

Urgency: HIGH = deadline pressure or user is frustrated/stuck, MED = active question,
LOW = general discussion.

Sort by score descending, then urgency.

## Important rules

- The founder's Reddit strategy is **help first, tool second**. The answer must be
  genuinely useful even if KestKlar never gets mentioned.
- Only mark `mention_tool = true` when the post is about the exact pain KestKlar
  solves AND it would feel natural (not spammy) to say "I'm building a tool for this".
- The "Answer" field should be the draft comment itself — something the founder can
  copy-paste and lightly edit. Make it sound human and specific to that post.
- If there are no qualifying posts, say so clearly.

## Optional flags

- `/reddit-opportunities --days 14` — look back 2 weeks instead of 1
- `/reddit-opportunities --subs Finanzen_AT austria` — only specific subreddits
- `/reddit-opportunities --all` — skip keyword pre-filter (slower, more results)

Pass these flags through to the fetch script when running it.
