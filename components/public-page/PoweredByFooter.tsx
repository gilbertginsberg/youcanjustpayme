import Link from "next/link";

export function PoweredByFooter({ displayName }: { displayName: string }) {
  return (
    <div className="border-t border-dashed border-[var(--surface-line)] px-5 py-6 text-center">
      {/* Free-plan footer dogfoods the product: it links to ycjpm's own tip page, not just the marketing site. */}
      <Link
        href="/ycjpm"
        className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
      >
        you can just pay {displayName.split(" ")[0]} here too — powered by ycjpm →
      </Link>
    </div>
  );
}
