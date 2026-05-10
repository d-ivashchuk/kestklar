import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-8">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-foreground flex items-center justify-center">
              <span className="text-background text-[10px] font-bold leading-none">K</span>
            </div>
            <span className="font-sans text-xs text-muted-foreground">KestKlar</span>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Kein Steuerberater · Nur ein Berechnungstool · EU-Hosting · DSGVO
          </p>

          <p className="text-xs text-muted-foreground">
            © 2026 Stackforge GmbH
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <Link href="/tools" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Tools
          </Link>
          <Link href="/datenschutz" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Datenschutz
          </Link>
          <Link href="/agb" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            AGB
          </Link>
          <Link href="/impressum" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Impressum
          </Link>
          <a
            href="mailto:hallo@kestklar.at"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}
