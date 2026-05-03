"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";

// Maps each DE article path to its EN equivalent and vice versa.
const ROUTE_MAP: Record<string, string> = {
  "/ratgeber": "/en/ratgeber",
  "/ratgeber/e1kv-ausfuellen": "/en/ratgeber/e1kv-guide",
  "/ratgeber/ausschuettungsgleiche-ertraege": "/en/ratgeber/deemed-distributions",
  "/ratgeber/kest-berechnen": "/en/ratgeber/how-to-calculate-kest",
  "/en/ratgeber": "/ratgeber",
  "/en/ratgeber/e1kv-guide": "/ratgeber/e1kv-ausfuellen",
  "/en/ratgeber/deemed-distributions": "/ratgeber/ausschuettungsgleiche-ertraege",
  "/en/ratgeber/how-to-calculate-kest": "/ratgeber/kest-berechnen",
};

function detectLangFromPath(pathname: string): "de" | "en" {
  return pathname.startsWith("/en") ? "en" : "de";
}

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Keep lang context in sync with URL so UI strings match the page language.
  useEffect(() => {
    const detected = detectLangFromPath(pathname);
    if (detected !== lang) setLang(detected);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentLang = detectLangFromPath(pathname);

  function handleLangSwitch(target: "de" | "en") {
    if (target === currentLang) return;
    const mapped = ROUTE_MAP[pathname];
    if (mapped) {
      router.push(mapped);
    } else {
      // On pages without a direct translation (home, preise, broker pages)
      // just flip the UI language in place.
      setLang(target);
    }
  }

  // Ratgeber label and href adapt to current language.
  const ratgeberHref = currentLang === "en" ? "/en/ratgeber" : "/ratgeber";
  const ratgeberLabel = currentLang === "en" ? "Guides" : "Ratgeber";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          : "bg-transparent backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-foreground flex items-center justify-center">
            <span
              className="text-background leading-none"
              style={{ fontFamily: "Baskerville, 'Baskerville Old Face', 'Hoefler Text', Georgia, serif", fontWeight: 700, fontSize: "15px" }}
            >K</span>
          </div>
          <span className="font-sans text-sm font-medium text-foreground">KestKlar</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.howItWorks}
          </Link>
          <Link href={ratgeberHref} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {ratgeberLabel}
          </Link>
          <Link href="/preise" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.pricing}
          </Link>
          <Link href="/#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            {t.nav.faq}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center border border-border text-xs">
            <button
              onClick={() => handleLangSwitch("de")}
              className={`px-2.5 py-1 transition-colors ${currentLang === "de" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              DE
            </button>
            <button
              onClick={() => handleLangSwitch("en")}
              className={`px-2.5 py-1 transition-colors ${currentLang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              EN
            </button>
          </div>

          <a
            href="/#waitlist"
            className="text-sm font-medium bg-foreground text-background px-4 py-1.5 hover:opacity-80 transition-opacity"
          >
            {t.nav.waitlist}
          </a>
        </div>
      </div>
    </header>
  );
}
