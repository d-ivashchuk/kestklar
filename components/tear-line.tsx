type Props = { tone?: "light" | "muted" };

export function TearLine({ tone = "light" }: Props) {
  const bg = tone === "muted" ? "bg-secondary" : "bg-background";
  return (
    <div className={`${bg} border-t border-border`} aria-hidden="true">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="tear-line" />
      </div>
    </div>
  );
}
