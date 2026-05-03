type StatusBadgeProps = {
  label?: string;
  variant?: "default" | "supported";
};

export function StatusBadge({
  label = "Jetzt in Entwicklung · Warteliste offen",
  variant = "default",
}: StatusBadgeProps) {
  const styles =
    variant === "supported"
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-border bg-background text-muted-foreground";

  return (
    <div className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block shrink-0" />
      {label}
    </div>
  );
}
