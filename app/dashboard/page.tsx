"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreator } from "@/components/dashboard/CreatorProvider";
import { BlockList } from "@/components/dashboard/BlockList";
import { AddBlockDialog } from "@/components/dashboard/AddBlockDialog";
import { ThemePicker } from "@/components/dashboard/ThemePicker";
import { AnalyticsPanel } from "@/components/dashboard/AnalyticsPanel";
import { UpgradeCard } from "@/components/dashboard/UpgradeCard";
import { PublicPage } from "@/components/public-page/PublicPage";

function DashboardBody() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "editor";
  const { creator, updateField } = useCreator();

  return (
    <div className="p-4 sm:p-8">
      <h1 className="font-display text-2xl">Your page</h1>
      <p className="mt-1 text-sm text-[var(--text-muted)]">
        No save button. Changes land the second you make them.
      </p>

      {tab === "editor" && (
        <Tabs defaultValue="edit" className="mt-8 lg:hidden">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <EditorPanel creator={creator} updateField={updateField} />
          </TabsContent>
          <TabsContent value="preview">
            <PreviewFrame />
          </TabsContent>
        </Tabs>
      )}

      {tab === "editor" && (
        <div className="mt-8 hidden gap-8 lg:grid lg:grid-cols-[1fr_440px]">
          <EditorPanel creator={creator} updateField={updateField} />
          <PreviewFrame />
        </div>
      )}

      {tab === "theme" && (
        <div className="mt-8 max-w-xl">
          <ThemePicker />
        </div>
      )}

      {tab === "analytics" && (
        <div className="mt-8 max-w-2xl">
          <AnalyticsPanel />
        </div>
      )}

      {tab === "upgrade" && (
        <div className="mt-8 max-w-xl space-y-6">
          <UpgradePanel />
        </div>
      )}
    </div>
  );
}

function EditorPanel({
  creator,
  updateField,
}: {
  creator: ReturnType<typeof useCreator>["creator"];
  updateField: ReturnType<typeof useCreator>["updateField"];
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
        <div>
          <p className="mb-1 text-sm text-[var(--text-muted)]">Display name</p>
          <Input
            value={creator.displayName}
            onChange={(e) => updateField("displayName", e.target.value)}
          />
        </div>
        <div>
          <p className="mb-1 text-sm text-[var(--text-muted)]">Bio</p>
          <Textarea
            value={creator.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg">Ways to get paid</h2>
          <AddBlockDialog />
        </div>
        <BlockList />
      </div>
    </div>
  );
}

function PreviewFrame() {
  const { creator } = useCreator();
  return (
    <div className="rounded-[var(--radius-card)] bg-black/10 p-4">
      <p className="mb-3 text-center text-xs text-[var(--text-muted)]">
        Live preview — this is what people see
      </p>
      <div className="overflow-hidden rounded-2xl">
        <PublicPage creator={creator} />
      </div>
    </div>
  );
}

function UpgradePanel() {
  const { creator, setPlan } = useCreator();
  const isPro = creator.plan === "pro";
  return (
    <div className="space-y-4">
      <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
        <h2 className="font-display text-lg font-semibold">
          {isPro ? "You're on pro" : "Free plan"}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Pro removes the &ldquo;powered by&rdquo; footer and the ad slot, unlocks
          every accent color plus light mode, gets a featured badge in the
          directory, and drops the 5-block cap.
        </p>
        <button
          type="button"
          onClick={() => setPlan(isPro ? "free" : "pro")}
          className="mt-4 rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
        >
          {isPro ? "Switch back to free (demo)" : "Upgrade to pro"}
        </button>
      </div>
      {!isPro && (
        <UpgradeCard message="You've hit the free limit. Upgrade if you're serious about this." />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardBody />
    </Suspense>
  );
}
