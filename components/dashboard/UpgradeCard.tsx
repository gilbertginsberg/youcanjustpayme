"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreator } from "./CreatorProvider";

export function UpgradeCard({
  message = "You've hit the free limit. Upgrade if you're serious about this.",
}: {
  message?: string;
}) {
  const { setPlan } = useCreator();
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[var(--accent-soft)] p-4">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
      <div className="flex-1">
        <p className="text-sm">{message}</p>
        <Button size="sm" className="mt-3" onClick={() => setPlan("pro")}>
          Upgrade to pro
        </Button>
      </div>
    </div>
  );
}
