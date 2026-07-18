import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary/20 text-warm",
        secondary: "bg-white/5 text-foreground ring-1 ring-line",
        brand: "bg-accent/25 text-warm",
        success: "bg-emerald-500/15 text-emerald-300",
        warn: "bg-amber-500/15 text-amber-200",
        danger: "bg-red-500/15 text-red-300",
        muted: "bg-white/5 text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
