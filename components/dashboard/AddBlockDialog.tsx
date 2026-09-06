"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PLATFORM_ORDER, PLATFORMS } from "@/lib/platforms";
import type { Platform } from "@/lib/types";
import { useCreator } from "./CreatorProvider";
import { UpgradeCard } from "./UpgradeCard";

export function AddBlockDialog() {
  const { creator, isAtBlockLimit, addBlock, freeBlockLimit } = useCreator();
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("venmo");
  const [handleOrAddress, setHandleOrAddress] = useState("");
  const [note, setNote] = useState("");

  function reset() {
    setPlatform("venmo");
    setHandleOrAddress("");
    setNote("");
  }

  function handleSubmit() {
    if (!handleOrAddress.trim()) return;
    const added = addBlock({
      platform,
      label: PLATFORMS[platform].label,
      handleOrAddress: handleOrAddress.trim(),
      note: note.trim() || undefined,
      featured: false,
    });
    if (added) {
      reset();
      setOpen(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add a way to get paid
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a way to get paid</DialogTitle>
          <DialogDescription>
            Pick a platform and drop in your handle. It goes straight on your page.
          </DialogDescription>
        </DialogHeader>

        {isAtBlockLimit ? (
          <UpgradeCard message={`You've hit the free limit (${freeBlockLimit} blocks). Upgrade if you're serious about this.`} />
        ) : (
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-[var(--text-muted)]">Platform</p>
              <div className="grid grid-cols-3 gap-2">
                {PLATFORM_ORDER.map((key) => {
                  const def = PLATFORMS[key];
                  const Icon = def.icon;
                  const active = platform === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPlatform(key)}
                      className={`flex flex-col items-center gap-1 rounded-md border px-2 py-2 text-xs transition-colors ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent)]/10"
                          : "border-[var(--surface-line)] hover:border-[var(--accent)]/50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {def.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-[var(--text-muted)]">
                {platform === "crypto" ? "Wallet address" : platform === "custom" ? "URL" : "Handle or address"}
              </p>
              <Input
                value={handleOrAddress}
                onChange={(e) => setHandleOrAddress(e.target.value)}
                placeholder={platform === "crypto" ? "bc1q..." : "@yourhandle"}
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-[var(--text-muted)]">Note (optional)</p>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. fastest way to reach me"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {!isAtBlockLimit && (
            <Button onClick={handleSubmit} disabled={!handleOrAddress.trim()}>
              Add it
            </Button>
          )}
        </DialogFooter>
        <p className="text-center text-xs text-[var(--text-muted)]">
          {creator.blocks.length} / {creator.plan === "free" ? freeBlockLimit : "∞"} blocks used
        </p>
      </DialogContent>
    </Dialog>
  );
}
