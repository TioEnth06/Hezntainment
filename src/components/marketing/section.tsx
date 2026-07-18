import { cn } from "@/lib/utils";

/** Shared rhythm so every marketing section measures the same. */
export function Section({
  id,
  tone = "surface",
  className,
  children,
  fullBleed,
}: {
  id?: string;
  tone?: "surface" | "panel" | "ink" | "primary" | "transparent";
  className?: string;
  children: React.ReactNode;
  fullBleed?: boolean;
}) {
  const tones = {
    surface: "bg-surface text-foreground",
    panel: "bg-panel text-foreground",
    ink: "bg-ink text-white",
    primary: "bg-primary text-white",
    transparent: "",
  };

  return (
    <section id={id} className={cn(tones[tone], className)}>
      {fullBleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-28">{children}</div>
      )}
    </section>
  );
}

export function Eyebrow({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.22em]",
        light ? "text-warm" : "text-primary",
      )}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  light,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.1]",
        light ? "text-white" : "text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}
