import { DEMO_CREATOR } from "./mock-data";
import type { CreatorPage } from "./types";

const STORAGE_KEY = "ycjpm:creator";

export function loadCreator(): CreatorPage {
  if (typeof window === "undefined") return DEMO_CREATOR;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEMO_CREATOR;
    const parsed = JSON.parse(raw) as CreatorPage;
    if (!parsed || !Array.isArray(parsed.blocks)) return DEMO_CREATOR;
    return parsed;
  } catch {
    return DEMO_CREATOR;
  }
}

export function saveCreator(creator: CreatorPage) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(creator));
  } catch {
    // ignore quota/serialization errors — demo persistence only
  }
}

export function resetCreator() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
