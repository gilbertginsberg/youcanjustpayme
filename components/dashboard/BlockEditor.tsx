"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Star, Trash2 } from "lucide-react";
import { PLATFORMS } from "@/lib/platforms";
import { PlatformIcon } from "@/lib/platform-icons";
import type { PaymentBlock } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useCreator } from "./CreatorProvider";

export function BlockEditor({ block }: { block: PaymentBlock }) {
  const { setFeatured, removeBlock } = useCreator();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });
  const def = PLATFORMS[block.platform];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 rounded-2xl bg-[var(--surface)] p-3 shadow-[var(--shadow-card)]",
        isDragging && "opacity-60"
      )}
    >
      <button
        type="button"
        className="cursor-grab touch-none text-[var(--text-muted)] active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg)]">
        <PlatformIcon id={block.platform} className="h-4 w-4" color={def.brandColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{block.label}</p>
        <p className="truncate text-xs text-[var(--text-muted)]">
          {block.handleOrAddress}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setFeatured(block.id)}
        title={block.featured ? "Featured" : "Make featured"}
        className={cn(
          "shrink-0 rounded-md p-1.5 transition-colors",
          block.featured
            ? "text-[var(--accent)]"
            : "text-[var(--text-muted)] hover:text-[var(--accent)]"
        )}
      >
        <Star className={cn("h-4 w-4", block.featured && "fill-current")} />
      </button>
      <button
        type="button"
        onClick={() => removeBlock(block.id)}
        title="Remove"
        className="shrink-0 rounded-md p-1.5 text-[var(--text-muted)] transition-colors hover:text-red-400"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
