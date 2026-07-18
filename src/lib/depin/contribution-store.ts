/**
 * Client-side simulation of AI Data Feed contribution points.
 * Each successful Monitor SYNC increments the counter (prep for Phase 3 DePIN).
 */

const STORAGE_KEY = "mna.aiDataFeedContribution";

export type ContributionState = {
  /** Accumulated contribution points from SYNC events */
  points: number;
  /** Successful SYNC actions (per content row) */
  syncCount: number;
  /** Points earned on the most recent SYNC */
  lastDelta: number;
  lastSyncAt: string | null;
};

const DEFAULT_STATE: ContributionState = {
  points: 0,
  syncCount: 0,
  lastDelta: 0,
  lastSyncAt: null,
};

/** Soft milestone for the progress ring (resets visually each cycle). */
export const CONTRIBUTION_EPOCH = 500;

/** Base points per successful content SYNC. */
export const POINTS_PER_SYNC = 28;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeContribution(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readRaw(): ContributionState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<ContributionState>;
    return {
      points: Math.max(0, Number(parsed.points) || 0),
      syncCount: Math.max(0, Number(parsed.syncCount) || 0),
      lastDelta: Math.max(0, Number(parsed.lastDelta) || 0),
      lastSyncAt:
        typeof parsed.lastSyncAt === "string" ? parsed.lastSyncAt : null,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeRaw(next: ContributionState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

export function getContributionState(): ContributionState {
  return readRaw();
}

export function getContributionStateServer(): ContributionState {
  return DEFAULT_STATE;
}

/**
 * Award points after a successful SYNC (one content row).
 * Optional metric views bump the delta slightly so richer posts feel heavier.
 */
export function recordSyncContribution(opts?: {
  views?: number;
  count?: number;
}): ContributionState {
  const count = Math.max(1, opts?.count ?? 1);
  const viewBonus = Math.min(
    40,
    Math.floor(Math.max(0, opts?.views ?? 0) / 25_000),
  );
  const delta = (POINTS_PER_SYNC + viewBonus) * count;
  const prev = readRaw();
  const next: ContributionState = {
    points: prev.points + delta,
    syncCount: prev.syncCount + count,
    lastDelta: delta,
    lastSyncAt: new Date().toISOString(),
  };
  writeRaw(next);
  return next;
}

export function contributionEpochProgress(points: number) {
  const inEpoch = points % CONTRIBUTION_EPOCH;
  return {
    inEpoch,
    percent: Math.round((inEpoch / CONTRIBUTION_EPOCH) * 100),
    epochIndex: Math.floor(points / CONTRIBUTION_EPOCH) + 1,
  };
}
