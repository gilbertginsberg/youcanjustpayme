import Link from "next/link";
import Image from "next/image";
import { DIRECTORY_CREATORS } from "@/lib/mock-data";

export default function DirectoryPage() {
  const sorted = [...DIRECTORY_CREATORS].sort((a, b) => {
    if (a.plan === b.plan) return 0;
    return a.plan === "pro" ? -1 : 1;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-16 text-[var(--text)]">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">
          ← back
        </Link>
        <h1 className="font-display mt-4 text-3xl">The directory</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          People who already figured out you can just ask to get paid.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {sorted.map((creator) => (
            <Link
              key={creator.handle}
              href={`/${creator.handle}`}
              className="group flex items-start gap-3 rounded-lg border border-[var(--surface-line)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
            >
              <Image
                src={creator.avatarUrl}
                alt={creator.displayName}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
                unoptimized
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display truncate text-base">
                    {creator.displayName}
                  </span>
                  {creator.plan === "pro" && (
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: creator.accent,
                        color: "var(--accent-ink)",
                      }}
                    >
                      featured
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-[var(--text-muted)]">
                  {creator.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
