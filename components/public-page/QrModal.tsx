"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function QrModal({
  open,
  onOpenChange,
  value,
  label,
  helperText = "Scan or copy. No link to tap — this doesn't work that way.",
  linkHref,
  linkLabel = "Open in app",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The address/handle/key to render as a QR code and copy target. */
  value: string;
  label: string;
  /** Override the default crypto-flavored copy for other copy-only platforms (Zelle, PIX, etc). */
  helperText?: string;
  /** Optional real deep link shown alongside the QR/copy pattern (e.g. UPI). */
  linkHref?: string;
  linkLabel?: string;
}) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    QRCode.toDataURL(value, {
      margin: 1,
      width: 240,
      color: { dark: "#10231F", light: "#F5F1E8" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [open, value]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — the value is still visible to copy by hand
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{helperText}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt={`QR code for ${label}`}
              className="h-56 w-56 rounded-2xl shadow-[var(--shadow-card)]"
            />
          ) : (
            <div className="h-56 w-56 animate-pulse rounded-2xl bg-[var(--bg)]" />
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center justify-between gap-2 rounded-2xl bg-[var(--bg)] px-3 py-2.5 text-left text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
          >
            <span className="truncate font-mono">{value}</span>
            {copied ? (
              <Check className="h-4 w-4 shrink-0 text-[var(--success)]" />
            ) : (
              <Copy className="h-4 w-4 shrink-0" />
            )}
          </button>
          {linkHref && (
            <a
              href={linkHref}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-3 py-2.5 text-sm font-semibold text-[var(--accent-ink)] transition-all hover:brightness-105"
            >
              {linkLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
