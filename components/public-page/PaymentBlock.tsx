"use client";

import { useState } from "react";
import { QrCode } from "lucide-react";
import type { PaymentBlock as PaymentBlockType } from "@/lib/types";
import { PLATFORMS } from "@/lib/platforms";
import { AmountChips } from "./AmountChips";
import { QrModal } from "./QrModal";
import { cn } from "@/lib/utils";

export function PaymentBlock({ block }: { block: PaymentBlockType }) {
  const [amount, setAmount] = useState<number | null>(null);
  const [pressed, setPressed] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const def = PLATFORMS[block.platform];
  const Icon = def.icon;
  const isCrypto = block.platform === "crypto";

  function handleActivate() {
    setPressed(true);
    window.setTimeout(() => setPressed(false), 220);
    if (isCrypto) {
      setQrOpen(true);
      return;
    }
    const url = def.buildUrl(block.handleOrAddress, amount ?? undefined);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button
        type="button"
        onClick={handleActivate}
        className={cn(
          "w-full border-t border-[var(--surface-line)] px-5 py-6 text-left transition-transform first:border-t-0",
          block.featured
            ? "bg-[var(--accent)] text-[var(--accent-ink)]"
            : "bg-transparent text-[var(--text)]",
          pressed && "animate-press"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              block.featured ? "bg-[var(--accent-ink)]/10" : "bg-[var(--surface)]"
            )}
          >
            {isCrypto ? (
              <QrCode className="h-5 w-5" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-display text-lg">{block.label}</span>
              {block.featured && (
                <span className="rounded-full bg-[var(--accent-ink)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
                  featured
                </span>
              )}
            </div>
            <p
              className={cn(
                "truncate text-sm",
                block.featured ? "text-[var(--accent-ink)]/70" : "text-[var(--text-muted)]"
              )}
            >
              {block.note ?? block.handleOrAddress}
            </p>
          </div>
        </div>
        {block.suggestedAmounts && block.suggestedAmounts.length > 0 && !isCrypto && (
          <AmountChips
            amounts={block.suggestedAmounts}
            selected={amount}
            onSelect={setAmount}
            featured={block.featured}
          />
        )}
      </button>
      {isCrypto && (
        <QrModal
          open={qrOpen}
          onOpenChange={setQrOpen}
          address={block.handleOrAddress}
          label={block.label}
        />
      )}
    </>
  );
}
