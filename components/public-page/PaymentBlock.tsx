"use client";

import { useState } from "react";
import { QrCode } from "lucide-react";
import type { PaymentBlock as PaymentBlockType } from "@/lib/types";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformIcon } from "@/lib/platform-icons";
import { AmountChips } from "./AmountChips";
import { QrModal } from "./QrModal";
import { cn } from "@/lib/utils";

/** Copy-block helper text for platforms with no real clickable payment link. */
function copyHelperText(platformId: string, displayName: string): string {
  switch (platformId) {
    case "zelle":
      return `Search for "${displayName}" in your bank's Zelle — no link to tap.`;
    case "applepay":
      return "Ask to send via Apple Pay using this contact — there's no public payment link.";
    case "googlepay":
      return "Ask to send via Google Pay using this contact — there's no public payment link.";
    case "mpesa":
      return "Send to this number via M-Pesa — no clickable link exists for this one.";
    case "interac":
      return "Send an Interac e-Transfer to this email — your bank app handles the rest.";
    case "pix":
      return "Scan or copy the PIX key. No universal payment link for PIX yet.";
    case "alipay":
    case "wechatpay":
    case "gcash":
      return "Scan or copy — this one's QR-code based, no web link.";
    case "lightning":
    case "ens":
    case "crypto":
    default:
      return "Scan or copy the address. No link to tap — crypto doesn't work that way.";
  }
}

export function PaymentBlock({ block }: { block: PaymentBlockType }) {
  const [amount, setAmount] = useState<number | null>(null);
  const [pressed, setPressed] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const def = PLATFORMS[block.platform];
  const isLinkable = def.linkable;

  function handleActivate() {
    setPressed(true);
    window.setTimeout(() => setPressed(false), 220);
    if (!isLinkable) {
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
          "w-full rounded-[var(--radius-card)] px-5 py-5 text-left transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0",
          block.featured
            ? "bg-[var(--accent)] text-[var(--accent-ink)] shadow-[var(--shadow-featured)] hover:brightness-[1.03]"
            : "bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-lg)]",
          pressed && "animate-press"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
              block.featured ? "bg-[var(--accent-ink)]/12" : "bg-[var(--surface-2)]"
            )}
          >
            {isLinkable ? (
              <PlatformIcon id={block.platform} className="h-5 w-5" color={def.brandColor} />
            ) : (
              <QrCode className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={cn(
                  "truncate font-display text-lg",
                  block.featured && "font-semibold"
                )}
              >
                {block.label}
              </span>
              {block.featured && (
                <span className="shrink-0 rounded-full bg-[var(--accent-ink)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--accent)]">
                  featured
                </span>
              )}
              {!block.featured && !isLinkable && (
                <span className="shrink-0 rounded-full bg-[var(--surface-2)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">
                  copy info
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
        {block.suggestedAmounts && block.suggestedAmounts.length > 0 && isLinkable && (
          <AmountChips
            amounts={block.suggestedAmounts}
            selected={amount}
            onSelect={setAmount}
            featured={block.featured}
          />
        )}
      </button>
      {!isLinkable && (
        <QrModal
          open={qrOpen}
          onOpenChange={setQrOpen}
          value={block.handleOrAddress}
          label={block.label}
          helperText={copyHelperText(block.platform, block.label)}
        />
      )}
    </>
  );
}
