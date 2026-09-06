import { Suspense } from "react";
import { CreatorProvider } from "@/components/dashboard/CreatorProvider";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CreatorProvider>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] lg:flex">
        <Suspense fallback={<div className="lg:w-60 lg:shrink-0" />}>
          <DashboardSidebar />
        </Suspense>
        <main className="flex-1 lg:min-h-screen">{children}</main>
      </div>
    </CreatorProvider>
  );
}
