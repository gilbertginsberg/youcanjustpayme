"use client";

import { useMemo } from "react";

const SPONSORS = [
  {
    name: "Fieldcast Mic Co.",
    pitch: "The mic half the creators on this site are secretly using.",
  },
  {
    name: "Panelwork",
    pitch: "A course on pricing your art so you stop underselling it.",
  },
  {
    name: "Loop & Ledger",
    pitch: "Bookkeeping for people who'd rather be making things.",
  },
  {
    name: "Rundown Studio",
    pitch: "Templates for a media kit that doesn't look like a PDF from 2014.",
  },
];

export function AdSlot({ seed = 0 }: { seed?: number }) {
  const sponsor = useMemo(() => SPONSORS[seed % SPONSORS.length], [seed]);

  return (
    <div className="mt-3 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-[var(--text-muted)]">
        Featured tool
      </p>
      <div className="rounded-2xl bg-[var(--surface-2)] p-3">
        <p className="font-display text-sm font-semibold">{sponsor.name}</p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">{sponsor.pitch}</p>
      </div>
    </div>
  );
}
