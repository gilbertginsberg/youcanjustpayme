"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CATEGORY_ORDER,
  PLATFORMS,
  POPULAR_PLATFORM_IDS,
  isCollapsedByDefault,
  getPlatformsByCategory,
} from "@/lib/platforms";
import { PlatformIcon } from "@/lib/platform-icons";
import type { PlatformId } from "@/lib/types";
import { useCreator } from "./CreatorProvider";
import { UpgradeCard } from "./UpgradeCard";

const SOFT_BLOCK_NUDGE_THRESHOLD = 5;

export function AddBlockDialog() {
  const { creator, isAtBlockLimit, addBlock, freeBlockLimit } = useCreator();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [platform, setPlatform] = useState<PlatformId | null>(null);
  const [handleOrAddress, setHandleOrAddress] = useState("");
  const [note, setNote] = useState("");

  const def = platform ? PLATFORMS[platform] : null;

  function reset() {
    setPlatform(null);
    setHandleOrAddress("");
    setNote("");
    setSearch("");
    setShowMore(false);
  }

  function handleSubmit() {
    if (!def || !handleOrAddress.trim()) return;
    const added = addBlock({
      platform: def.id,
      label: def.label,
      handleOrAddress: handleOrAddress.trim(),
      note: note.trim() || undefined,
      featured: false,
    });
    if (added) {
      reset();
      setOpen(false);
    }
  }

  const inputPlaceholder = useMemo(() => {
    if (!def) return "";
    if (def.category === "crypto") return def.id === "ens" ? "yourname.eth" : "bc1q...";
    if (def.id === "custom" || def.id === "giftcard" || def.id === "amazonwishlist") {
      return "https://...";
    }
    if (def.id === "zelle" || def.id === "interac") return "you@email.com or phone";
    return "@yourhandle";
  }, [def]);

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
      <DialogContent className={def ? undefined : "max-w-lg p-0"}>
        {isAtBlockLimit ? (
          <>
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>Add a way to get paid</DialogTitle>
            </DialogHeader>
            <div className="px-6 pb-6">
              <UpgradeCard
                message={`You've hit the free limit (${freeBlockLimit} blocks). Upgrade if you're serious about this.`}
              />
            </div>
          </>
        ) : !def ? (
          <>
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>Add a way to get paid</DialogTitle>
              <DialogDescription>
                Search for a platform, or browse by category below.
              </DialogDescription>
            </DialogHeader>
            <Command shouldFilter={false} className="border-0 bg-transparent">
              <CommandInput
                autoFocus
                value={search}
                onValueChange={setSearch}
                placeholder="Search platforms..."
              />
              <CommandList>
                <CommandEmpty>No platform matches that.</CommandEmpty>
                <PlatformOptions
                  search={search}
                  showMore={showMore}
                  onSelect={(id) => setPlatform(id)}
                />
              </CommandList>
            </Command>
            {!search && (
              <div className="border-t border-[var(--surface-line)] p-3">
                <button
                  type="button"
                  onClick={() => setShowMore((v) => !v)}
                  className="flex w-full items-center justify-center gap-1 rounded-xl py-2 text-xs font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${showMore ? "rotate-180" : ""}`}
                  />
                  {showMore ? "Show fewer options" : "Show more options"}
                </button>
              </div>
            )}
            {creator.blocks.length >= SOFT_BLOCK_NUDGE_THRESHOLD && (
              <div className="mx-6 mb-6 rounded-2xl bg-[var(--surface-2)] px-4 py-3 text-xs text-[var(--text-muted)]">
                Most pages convert better with 3-5 clear options — consider featuring your top
                pick instead of adding more.
              </div>
            )}
            {!(creator.blocks.length >= SOFT_BLOCK_NUDGE_THRESHOLD) && <div className="pb-2" />}
          </>
        ) : (
          <>
            <DialogHeader>
              <button
                type="button"
                onClick={() => setPlatform(null)}
                className="mb-1 flex w-fit items-center gap-1 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Choose a different platform
              </button>
              <DialogTitle className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--surface-2)]">
                  <PlatformIcon id={def.id} className="h-4 w-4" color={def.brandColor} />
                </span>
                {def.label}
              </DialogTitle>
              <DialogDescription>
                {def.linkable
                  ? "Drop in your handle. It goes straight on your page."
                  : "This platform has no clickable payment link — visitors get a copy-and-scan block instead."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-[var(--text-muted)]">
                  {def.category === "crypto" || def.category === "regional"
                    ? "Address / key / handle"
                    : "Handle or address"}
                </p>
                <Input
                  value={handleOrAddress}
                  onChange={(e) => setHandleOrAddress(e.target.value)}
                  placeholder={inputPlaceholder}
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
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={!handleOrAddress.trim()}>
                Add it
              </Button>
            </DialogFooter>
          </>
        )}
        {!isAtBlockLimit && (
          <p className="text-center text-xs text-[var(--text-muted)] pb-1">
            {creator.blocks.length} / {creator.plan === "free" ? freeBlockLimit : "∞"} blocks used
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PlatformOptions({
  search,
  showMore,
  onSelect,
}: {
  search: string;
  showMore: boolean;
  onSelect: (id: PlatformId) => void;
}) {
  const query = search.trim().toLowerCase();
  const matches = (id: PlatformId) => {
    if (!query) return true;
    const p = PLATFORMS[id];
    return (
      p.label.toLowerCase().includes(query) ||
      p.descriptor.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query)
    );
  };
  const visible = (id: PlatformId) => {
    if (query) return matches(id);
    return showMore || !isCollapsedByDefault(PLATFORMS[id]);
  };

  return (
    <>
      <CommandGroup heading="Popular">
        {POPULAR_PLATFORM_IDS.filter(matches).map((id) => (
          <PlatformCommandItem key={`popular-${id}`} groupKey="popular" id={id} onSelect={onSelect} />
        ))}
      </CommandGroup>
      {CATEGORY_ORDER.map(({ key, label }) => {
        const ids = getPlatformsByCategory(key)
          .map((p) => p.id)
          .filter(visible);
        if (ids.length === 0) return null;
        return (
          <CommandGroup key={key} heading={label}>
            {ids.map((id) => (
              <PlatformCommandItem key={`${key}-${id}`} groupKey={key} id={id} onSelect={onSelect} />
            ))}
          </CommandGroup>
        );
      })}
    </>
  );
}

function PlatformCommandItem({
  groupKey,
  id,
  onSelect,
}: {
  groupKey: string;
  id: PlatformId;
  onSelect: (id: PlatformId) => void;
}) {
  const p = PLATFORMS[id];
  return (
    <CommandItem value={`${groupKey}-${id}`} onSelect={() => onSelect(id)}>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)]">
        <PlatformIcon id={id} className="h-3.5 w-3.5" color={p.brandColor} />
      </span>
      <span className="min-w-0 flex-1 truncate">
        <span className="font-medium">{p.label}</span>
        <span className="text-[var(--text-muted)]"> — {p.descriptor}</span>
      </span>
    </CommandItem>
  );
}
