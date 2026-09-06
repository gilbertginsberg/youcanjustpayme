"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LayoutDashboard, Palette, BarChart3, Sparkles, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreator } from "./CreatorProvider";
import { Switch } from "@/components/ui/switch";

const NAV = [
  { key: "editor", label: "Page editor", icon: LayoutDashboard },
  { key: "theme", label: "Theme", icon: Palette },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "upgrade", label: "Upgrade", icon: Sparkles },
];

export function DashboardSidebar() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "editor";
  const { creator, setPlan } = useCreator();

  return (
    <aside className="border-b border-[var(--surface-line)] px-4 py-5 lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
      <Link href="/" className="font-display text-base font-semibold">
        you can just pay me
      </Link>

      <nav className="mt-6 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col lg:gap-1 lg:overflow-visible">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.key;
          return (
            <Link
              key={item.key}
              href={`/dashboard?tab=${item.key}`}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--surface)] px-3 py-2 shadow-[var(--shadow-card)] lg:mt-8">
        <div>
          <p className="text-xs text-[var(--text-muted)]">Plan (demo toggle)</p>
          <p className="text-sm font-medium">{creator.plan === "pro" ? "Pro" : "Free"}</p>
        </div>
        <Switch
          checked={creator.plan === "pro"}
          onCheckedChange={(checked) => setPlan(checked ? "pro" : "free")}
        />
      </div>

      <a
        href={`/${creator.handle}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 hidden items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text)] lg:flex"
      >
        View live page <ExternalLink className="h-3 w-3" />
      </a>
    </aside>
  );
}
