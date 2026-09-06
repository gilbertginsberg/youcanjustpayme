"use client";

import { useEffect, useState } from "react";
import { DEMO_CREATOR } from "@/lib/mock-data";
import { loadCreator } from "@/lib/storage";
import type { CreatorPage } from "@/lib/types";
import { PublicPage } from "@/components/public-page/PublicPage";

// Phase 1: there's no real multi-tenancy or backend, so any handle renders
// whatever's saved in this browser's localStorage (the same store the
// dashboard writes to) — that's what makes dashboard edits show up here.
// Falls back to the seeded demo creator until the dashboard has saved
// anything, and on the server render before hydration.
export default function HandlePage() {
  const [creator, setCreator] = useState<CreatorPage>(DEMO_CREATOR);

  useEffect(() => {
    setCreator(loadCreator());
  }, []);

  return <PublicPage creator={creator} />;
}
