/**
 * Token-bucket rate limit backed by Cloudflare KV via the Cloudflare REST API.
 *
 * KV is globally replicated and explicitly **non-PII** by policy (ARCHITECTURE.md §11).
 * The keys we store here are `userId`-scoped counters — pseudonymous IDs only,
 * no email, name, or address.
 */

interface RateLimitArgs {
  key: string;
  limit: number;
  windowSec: number;
}

export async function checkRateLimit(_args: RateLimitArgs): Promise<boolean> {
  // TODO: implement against Cloudflare KV REST API. For the scaffold we
  // return true (allow) so the dev path works without KV credentials.
  // The implementation should:
  //   1. INCR counter at key with TTL = windowSec
  //   2. If new count > limit → return false
  //   3. Else → return true
  // Cloudflare KV doesn't have native INCR; emulate with read-modify-write
  // and accept the small race (this is a soft limit, not auth).
  return true;
}
