const COLLAPSE_KEY = "mna.sidebarCollapsed";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeSidebarCollapsed(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSidebarCollapsed() {
  return window.localStorage.getItem(COLLAPSE_KEY) === "1";
}

export function getSidebarCollapsedServer() {
  return false;
}

export function setSidebarCollapsed(next: boolean) {
  window.localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
  emit();
}

export function toggleSidebarCollapsed() {
  setSidebarCollapsed(!getSidebarCollapsed());
}
