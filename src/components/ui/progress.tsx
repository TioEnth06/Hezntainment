"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export function Progress({
  className,
  value = 0,
  indicatorClassName,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string;
}) {
  return (
    <ProgressPrimitive.Root
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-panel-soft", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full bg-primary transition-all", indicatorClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value ?? 0))}%` }}
      />
    </ProgressPrimitive.Root>
  );
}
