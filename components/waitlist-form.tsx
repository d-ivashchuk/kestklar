"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useLang } from "@/lib/i18n";

export function WaitlistForm({ size = "default" }: { size?: "default" | "large" }) {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 409) {
        toast.info("Du bist bereits auf der Warteliste 👍");
      } else if (res.ok) {
        toast.success("Du bist dabei! Wir melden uns bald.");
        setEmail("");
      } else {
        toast.error("Etwas ist schiefgelaufen. Bitte versuche es nochmal.");
      }
    } catch {
      toast.error("Etwas ist schiefgelaufen. Bitte versuche es nochmal.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${size === "large" ? "max-w-md" : "max-w-sm"} w-full`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.waitlistPlaceholder}
        className={`flex-1 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors font-sans
          ${size === "large" ? "px-4 py-3 text-sm" : "px-3 py-2 text-sm"}`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className={`bg-foreground text-background font-medium font-sans hover:opacity-80 transition-opacity disabled:opacity-50 whitespace-nowrap
          ${size === "large" ? "px-5 py-3 text-sm" : "px-4 py-2 text-sm"}`}
      >
        {status === "loading" ? "…" : t.waitlistBtn}
      </button>
    </form>
  );
}
