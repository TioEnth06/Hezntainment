import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OverviewStatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardContent className="p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted sm:text-[11px]">
            {label}
          </p>
          <Icon className="size-3.5 shrink-0 text-primary sm:size-4" />
        </div>
        <p className="mt-1.5 font-mono text-xl font-bold tracking-tight sm:mt-2 sm:text-2xl">
          {value}
        </p>
        <p className="mt-1 truncate text-[11px] text-muted sm:text-xs">{hint}</p>
      </CardContent>
    </Card>
  );
}

export function OverviewSectionCard({
  title,
  description,
  href,
  children,
}: {
  title: string;
  description: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-[15px] sm:text-base">{title}</CardTitle>
            <CardDescription className="mt-0.5 text-xs sm:text-sm">
              {description}
            </CardDescription>
          </div>
          {href ? (
            <Button
              asChild
              variant="outline"
              size="icon"
              className="size-8 shrink-0 sm:size-9"
            >
              <Link href={href} aria-label={title}>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function OverviewEmpty({ children }: { children: ReactNode }) {
  return <p className="py-6 text-center text-sm text-muted">{children}</p>;
}
