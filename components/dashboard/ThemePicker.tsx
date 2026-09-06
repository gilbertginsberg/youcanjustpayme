"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { CURATED_ACCENTS_FREE, CURATED_ACCENTS_PRO } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { useCreator } from "./CreatorProvider";
import { UpgradeCard } from "./UpgradeCard";

export function ThemePicker() {
  const { creator, updateTheme } = useCreator();
  const isPro = creator.plan === "pro";
  const [showLockedHint, setShowLockedHint] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-lg">Accent color</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          The color your featured block wears. Free plans pick from three; pro
          gets the rest.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {CURATED_ACCENTS_FREE.map((color) => (
            <SwatchButton
              key={color}
              color={color}
              active={creator.theme.accent === color}
              onClick={() => updateTheme({ accent: color })}
            />
          ))}
          {CURATED_ACCENTS_PRO.map((color) => (
            <SwatchButton
              key={color}
              color={color}
              active={creator.theme.accent === color}
              locked={!isPro}
              onClick={() => {
                if (!isPro) {
                  setShowLockedHint(true);
                  return;
                }
                updateTheme({ accent: color });
              }}
            />
          ))}
        </div>
        {showLockedHint && !isPro && (
          <div className="mt-4">
            <UpgradeCard message="That color's pro-only. Upgrade if you're serious about this." />
          </div>
        )}
      </div>

      <div>
        <h3 className="font-display text-lg">Mode</h3>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Dark is the default. Light mode is a pro perk.
        </p>
        <div className="mt-4 flex gap-3">
          <ModeButton
            label="Dark"
            active={creator.theme.mode === "dark"}
            onClick={() => updateTheme({ mode: "dark" })}
          />
          <ModeButton
            label="Light"
            active={creator.theme.mode === "light"}
            locked={!isPro}
            onClick={() => {
              if (!isPro) {
                setShowLockedHint(true);
                return;
              }
              updateTheme({ mode: "light" });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SwatchButton({
  color,
  active,
  locked,
  onClick,
}: {
  color: string;
  active: boolean;
  locked?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative h-10 w-10 rounded-full border-2 transition-transform",
        active ? "border-[var(--text)]" : "border-transparent",
        locked && "opacity-40"
      )}
      style={{ backgroundColor: color }}
      title={locked ? "Pro only" : color}
    >
      {locked && (
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--surface)]">
          <Lock className="h-2.5 w-2.5 text-[var(--text-muted)]" />
        </span>
      )}
    </button>
  );
}

function ModeButton({
  label,
  active,
  locked,
  onClick,
}: {
  label: string;
  active: boolean;
  locked?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-[var(--accent)] text-[var(--accent-ink)]"
          : "bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]",
        locked && "opacity-60"
      )}
    >
      {label}
      {locked && <Lock className="h-3 w-3" />}
    </button>
  );
}
