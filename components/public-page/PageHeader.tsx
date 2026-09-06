import Image from "next/image";

export function PageHeader({
  avatarUrl,
  displayName,
  bio,
}: {
  avatarUrl: string;
  displayName: string;
  bio: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-2 pb-8 pt-12 text-center">
      <Image
        src={avatarUrl}
        alt={displayName}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover shadow-[var(--shadow-card)] ring-4 ring-[var(--surface)]"
        unoptimized
      />
      <h1 className="font-display text-2xl font-semibold text-[var(--text)]">{displayName}</h1>
      <p className="max-w-xs text-sm text-[var(--text-muted)]">{bio}</p>
    </div>
  );
}
