"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CreatorPage, PaymentBlock, Plan, Theme } from "@/lib/types";
import { loadCreator, saveCreator } from "@/lib/storage";

const FREE_BLOCK_LIMIT = 5;

type CreatorContextValue = {
  creator: CreatorPage;
  ready: boolean;
  freeBlockLimit: number;
  isAtBlockLimit: boolean;
  updateField: <K extends keyof CreatorPage>(key: K, value: CreatorPage[K]) => void;
  updateTheme: (theme: Partial<Theme>) => void;
  setPlan: (plan: Plan) => void;
  addBlock: (block: Omit<PaymentBlock, "id" | "order">) => boolean;
  updateBlock: (id: string, patch: Partial<PaymentBlock>) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (orderedIds: string[]) => void;
  setFeatured: (id: string) => void;
};

const CreatorContext = createContext<CreatorContextValue | null>(null);

export function CreatorProvider({ children }: { children: React.ReactNode }) {
  const [creator, setCreator] = useState<CreatorPage | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage on mount (client-only, deliberately
    // outside React's render flow — there is no external subscription here).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCreator(loadCreator());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (creator) saveCreator(creator);
  }, [creator, hydrated]);

  const updateField = useCallback(
    <K extends keyof CreatorPage>(key: K, value: CreatorPage[K]) => {
      setCreator((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    []
  );

  const updateTheme = useCallback((theme: Partial<Theme>) => {
    setCreator((prev) =>
      prev ? { ...prev, theme: { ...prev.theme, ...theme } } : prev
    );
  }, []);

  const setPlan = useCallback((plan: Plan) => {
    setCreator((prev) => (prev ? { ...prev, plan } : prev));
  }, []);

  const addBlock = useCallback(
    (block: Omit<PaymentBlock, "id" | "order">) => {
      let added = false;
      setCreator((prev) => {
        if (!prev) return prev;
        if (prev.plan === "free" && prev.blocks.length >= FREE_BLOCK_LIMIT) {
          return prev;
        }
        added = true;
        const newBlock: PaymentBlock = {
          ...block,
          id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          order: prev.blocks.length,
        };
        const blocks = block.featured
          ? prev.blocks.map((b) => ({ ...b, featured: false }))
          : prev.blocks;
        return { ...prev, blocks: [...blocks, newBlock] };
      });
      return added;
    },
    []
  );

  const updateBlock = useCallback((id: string, patch: Partial<PaymentBlock>) => {
    setCreator((prev) => {
      if (!prev) return prev;
      let blocks = prev.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b));
      if (patch.featured) {
        blocks = blocks.map((b) => (b.id === id ? b : { ...b, featured: false }));
      }
      return { ...prev, blocks };
    });
  }, []);

  const removeBlock = useCallback((id: string) => {
    setCreator((prev) =>
      prev ? { ...prev, blocks: prev.blocks.filter((b) => b.id !== id) } : prev
    );
  }, []);

  const reorderBlocks = useCallback((orderedIds: string[]) => {
    setCreator((prev) => {
      if (!prev) return prev;
      const byId = new Map(prev.blocks.map((b) => [b.id, b]));
      const blocks = orderedIds
        .map((id, index) => {
          const block = byId.get(id);
          return block ? { ...block, order: index } : null;
        })
        .filter((b): b is PaymentBlock => b !== null);
      return { ...prev, blocks };
    });
  }, []);

  const setFeatured = useCallback((id: string) => {
    setCreator((prev) => {
      if (!prev) return prev;
      const blocks = prev.blocks.map((b) => ({ ...b, featured: b.id === id }));
      return { ...prev, blocks };
    });
  }, []);

  const value = useMemo<CreatorContextValue | null>(() => {
    if (!creator) return null;
    return {
      creator,
      ready: true,
      freeBlockLimit: FREE_BLOCK_LIMIT,
      isAtBlockLimit: creator.plan === "free" && creator.blocks.length >= FREE_BLOCK_LIMIT,
      updateField,
      updateTheme,
      setPlan,
      addBlock,
      updateBlock,
      removeBlock,
      reorderBlocks,
      setFeatured,
    };
  }, [creator, updateField, updateTheme, setPlan, addBlock, updateBlock, removeBlock, reorderBlocks, setFeatured]);

  if (!value) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--text-muted)]">
        Loading your page…
      </div>
    );
  }

  return (
    <CreatorContext.Provider value={value}>{children}</CreatorContext.Provider>
  );
}

export function useCreator() {
  const ctx = useContext(CreatorContext);
  if (!ctx) throw new Error("useCreator must be used within CreatorProvider");
  return ctx;
}

export { FREE_BLOCK_LIMIT };
