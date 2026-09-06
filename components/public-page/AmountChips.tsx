"use client";

import { cn } from "@/lib/utils";

export function AmountChips({
  amounts,
  selected,
  onSelect,
  featured,
}: {
  amounts: number[];
  selected: number | null;
  onSelect: (amount: number | null) => void;
  featured?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 pt-3">
      {amounts.map((amount) => {
        const isSelected = selected === amount;
        return (
          <button
            key={amount}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(isSelected ? null : amount);
            }}
            className={cn(
              "rounded-[var(--radius-pill)] px-3.5 py-1.5 text-xs font-semibold transition-all",
              featured
                ? isSelected
                  ? "bg-[var(--accent-ink)] text-[var(--accent)]"
                  : "bg-[var(--accent-ink)]/10 text-[var(--accent-ink)] hover:bg-[var(--accent-ink)]/20"
                : isSelected
                ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                : "bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]"
            )}
          >
            ${amount}
          </button>
        );
      })}
    </div>
  );
}
