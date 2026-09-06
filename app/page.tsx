import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_CREATOR } from "@/lib/mock-data";

const REASONS = [
  {
    title: "One page, every way to pay",
    body: "Venmo, Cash App, PayPal, Ko-fi, Patreon, crypto — stop pasting five links in five different captions.",
  },
  {
    title: "One block gets to be the loud one",
    body: "Feature your favorite way to get paid. Everything else stays quiet, ticket-stub style, underneath it.",
  },
  {
    title: "You can just say it",
    body: "No corporate hedging, no 'support my work' euphemisms. The page says what it is.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg">you can just pay me</span>
        <nav className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
          <Link href="/directory" className="hover:text-[var(--text)]">
            Directory
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Open dashboard</Button>
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-16 text-center">
        <h1 className="font-display max-w-2xl text-4xl leading-tight sm:text-5xl">
          Linktree, but you can just pay me.
        </h1>
        <p className="mt-5 max-w-lg text-[var(--text-muted)]">
          One link for every way someone can send you money. No forms, no
          gatekeeping, no reason to wait for permission.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button size="lg">
              Build your page <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/${DEMO_CREATOR.handle}`}>
            <Button size="lg" variant="outline">
              See a live example
            </Button>
          </Link>
        </div>

        <div className="mt-24 grid w-full gap-6 text-left sm:grid-cols-3">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-lg border border-[var(--surface-line)] bg-[var(--surface)] p-5"
            >
              <h3 className="font-display text-lg">{reason.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{reason.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
