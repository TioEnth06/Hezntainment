"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  dictionaries,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n/dictionaries";
import {
  getLocale,
  getServerLocale,
  setLocale,
  subscribeLocale,
} from "@/lib/i18n/locale-store";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(
  template: string,
  params?: Record<string, string | number>,
) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`,
  );
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, getLocale, getServerLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      const raw =
        dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
      return interpolate(raw, params);
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return ctx;
}
