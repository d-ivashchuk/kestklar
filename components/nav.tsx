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
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close the mobile menu whenever navigation happens.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll + ESC-to-close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function handleLangSwitch(target: "de" | "en") {
    if (target === lang) return;
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
  const ratgeberHref = lang === "en" ? "/en/ratgeber" : "/ratgeber";
  const ratgeberLabel = lang === "en" ? "Guides" : "Ratgeber";

  const navLinks = [
    { href: "/#how-it-works", label: t.nav.howItWorks },
    { href: ratgeberHref, label: ratgeberLabel },
    { href: "/preise", label: t.nav.pricing },
    { href: "/#faq", label: t.nav.faq },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center border border-border text-xs">
              <button
                onClick={() => handleLangSwitch("de")}
                className={`px-2.5 py-1 transition-colors ${lang === "de" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                DE
              </button>
              <button
                onClick={() => handleLangSwitch("en")}
                className={`px-2.5 py-1 transition-colors ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
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

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden inline-flex items-center justify-center w-9 h-9 -mr-2 text-foreground"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`sm:hidden fixed inset-0 top-14 z-40 bg-background transition-opacity duration-200 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full overflow-y-auto px-4 pt-6 pb-10 flex flex-col">
          <nav className="flex flex-col border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl text-foreground py-5 border-b border-border hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {lang === "en" ? "Language" : "Sprache"}
            </span>
            <div className="flex items-center border border-border text-xs">
              <button
                onClick={() => handleLangSwitch("de")}
                className={`px-3 py-1.5 transition-colors ${lang === "de" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                DE
              </button>
              <button
                onClick={() => handleLangSwitch("en")}
                className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </button>
            </div>
          </div>

          <a
            href="/#waitlist"
            onClick={() => setMenuOpen(false)}
            className="mt-6 text-sm font-medium bg-foreground text-background text-center px-4 py-3 hover:opacity-80 transition-opacity"
          >
            {t.nav.waitlist}
          </a>
        </div>
      </div>
    </>
  );
}
