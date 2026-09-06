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
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              featured
                ? isSelected
                  ? "border-[var(--accent-ink)] bg-[var(--accent-ink)] text-[var(--accent)]"
                  : "border-[var(--accent-ink)]/40 text-[var(--accent-ink)] hover:border-[var(--accent-ink)]"
                : isSelected
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                : "border-[var(--surface-line)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
            )}
          >
            ${amount}
          </button>
        );
      })}
    </div>
  );
}
