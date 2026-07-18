"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Cpu,
  Fingerprint,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";
import { Progress } from "@/components/ui/progress";
import {
  CONTRIBUTION_EPOCH,
  contributionEpochProgress,
  getContributionState,
  getContributionStateServer,
  subscribeContribution,
} from "@/lib/depin/contribution-store";
import { useI18n, type TranslationKey } from "@/lib/i18n";
import { fadeUp, springSoft, staggerContainer, viewportOnce } from "@/lib/motion";
import { formatNumber } from "@/lib/utils";

const ITEMS: {
  icon: typeof Fingerprint;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}[] = [
  {
    icon: Fingerprint,
    titleKey: "web3.auth.title",
    bodyKey: "web3.auth.body",
  },
  {
    icon: Wallet,
    titleKey: "web3.payouts.title",
    bodyKey: "web3.payouts.body",
  },
  {
    icon: ShieldCheck,
    titleKey: "web3.hash.title",
    bodyKey: "web3.hash.body",
  },
  {
    icon: Cpu,
    titleKey: "web3.feed.title",
    bodyKey: "web3.feed.body",
  },
];

export function Web3Horizon() {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const feed = useSyncExternalStore(
    subscribeContribution,
    getContributionState,
    getContributionStateServer,
  );
  const epoch = contributionEpochProgress(feed.points);

  return (
    <Section id="web3-horizon" tone="ink" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(102,108,255,0.28),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(140,82,255,0.18),transparent_45%)]"
      />
      <div className="relative">
        <Eyebrow light>{t("web3.eyebrow")}</Eyebrow>
        <SectionTitle light className="max-w-4xl">
          {t("web3.title")}
        </SectionTitle>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          {t("web3.body")}
        </p>

        <motion.div
          className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {ITEMS.map((item) => (
              <motion.article
                key={item.titleKey}
                variants={fadeUp}
                whileHover={reduce ? undefined : { y: -3 }}
                transition={springSoft}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
              >
                <item.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-white">
                  {t(item.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {t(item.bodyKey)}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            variants={fadeUp}
            className="flex flex-col justify-between rounded-xl border border-primary/35 bg-gradient-to-b from-primary/20 to-accent/10 p-6 ring-1 ring-white/10"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-warm">
                <Sparkles className="size-3" />
                {t("web3.feed.badge")}
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                {t("web3.feed.live")}
              </p>
              <p className="mt-2 font-mono text-4xl font-bold tracking-tight text-white md:text-5xl">
                {formatNumber(feed.points)}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {feed.syncCount > 0
                  ? `${formatNumber(feed.syncCount)} SYNC · +${feed.lastDelta || 0}`
                  : t("web3.feed.hint")}
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[11px] text-white/70">
                  <span>
                    {t("dashboard.feed.epoch", { n: epoch.epochIndex })}
                  </span>
                  <span className="font-mono">
                    {formatNumber(epoch.inEpoch)} / {formatNumber(CONTRIBUTION_EPOCH)}
                  </span>
                </div>
                <Progress
                  value={epoch.percent}
                  className="h-2.5 bg-white/10"
                  indicatorClassName="bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/55">
              {t("web3.feed.hint")}
            </p>
            <Link
              href="/register"
              className="btn-warm mt-6 inline-flex justify-center px-5 py-3 text-sm font-bold"
            >
              {t("web3.cta")}
            </Link>
          </motion.aside>
        </motion.div>
      </div>
    </Section>
  );
}
