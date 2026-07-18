import type { Locale } from "./dictionaries";

export const LOCALE_STORAGE_KEY = "mna.locale";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeLocale(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "id";
}

export function getLocale(): Locale {
  const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (isLocale(saved)) return saved;
  return window.navigator.language.toLowerCase().startsWith("id") ? "id" : "en";
}

export function getServerLocale(): Locale {
  return "en";
}

export function setLocale(next: Locale) {
  window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  emit();
}
