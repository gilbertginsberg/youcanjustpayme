"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy } from "lucide-react";
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
  address,
  label,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  label: string;
}) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    QRCode.toDataURL(address, {
      margin: 1,
      width: 240,
      color: { dark: "#10231F", light: "#F5F1E8" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [open, address]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — the address is still visible to copy by hand
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            Scan or copy the address. No link to tap — crypto doesn&apos;t work that way.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="QR code for wallet address"
              className="h-56 w-56 rounded-md"
            />
          ) : (
            <div className="h-56 w-56 animate-pulse rounded-md bg-[var(--bg)]" />
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center justify-between gap-2 rounded-md border border-[var(--surface-line)] bg-[var(--bg)] px-3 py-2 text-left text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--accent)]"
          >
            <span className="truncate font-mono">{address}</span>
            {copied ? (
              <Check className="h-4 w-4 shrink-0 text-[var(--success)]" />
            ) : (
              <Copy className="h-4 w-4 shrink-0" />
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
