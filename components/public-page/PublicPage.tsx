import type { CreatorPage } from "@/lib/types";
import { PageHeader } from "./PageHeader";
import { PaymentBlock } from "./PaymentBlock";
import { AdSlot } from "./AdSlot";
import { PoweredByFooter } from "./PoweredByFooter";

export function PublicPage({ creator }: { creator: CreatorPage }) {
  const featured = creator.blocks.find((b) => b.featured);
  const rest = creator.blocks
    .filter((b) => !b.featured)
    .sort((a, b) => a.order - b.order);
  const ordered = featured ? [featured, ...rest] : rest;
  const isFree = creator.plan === "free";

  return (
    <div
      data-theme={creator.theme.mode}
      style={{ "--accent": creator.theme.accent } as React.CSSProperties}
      className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-[var(--bg)] px-4 text-[var(--text)] sm:px-5"
    >
      <PageHeader
        avatarUrl={creator.avatarUrl}
        displayName={creator.displayName}
        bio={creator.bio}
      />
      <div className="flex flex-col gap-3">
        {ordered.map((block) => (
          <PaymentBlock key={block.id} block={block} />
        ))}
      </div>
      {isFree && <AdSlot seed={creator.handle.length} />}
      {isFree && <PoweredByFooter displayName={creator.displayName} />}
      {!isFree && <div className="pb-10" />}
    </div>
  );
}
