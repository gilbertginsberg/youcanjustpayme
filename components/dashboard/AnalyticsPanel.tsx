const FAKE_DAILY = [12, 18, 9, 24, 31, 22, 28];
const MAX = Math.max(...FAKE_DAILY);

export function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Page views (30d)", value: "1,204" },
          { label: "Link taps", value: "386" },
          { label: "Tap rate", value: "32%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]"
          >
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            <p className="font-display mt-1 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[var(--radius-card)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
        <p className="text-sm text-[var(--text-muted)]">Taps this week</p>
        <div className="mt-4 flex h-32 items-end gap-2">
          {FAKE_DAILY.map((value, i) => (
            <div key={i} className="flex-1">
              <div
                className="rounded-t-lg bg-[var(--accent)]"
                style={{ height: `${(value / MAX) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          Mock numbers — real analytics show up once people can actually tap your links in the wild.
        </p>
      </div>
    </div>
  );
}
