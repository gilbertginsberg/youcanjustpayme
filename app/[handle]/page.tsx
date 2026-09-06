import { DEMO_CREATOR } from "@/lib/mock-data";
import { PublicPage } from "@/components/public-page/PublicPage";

// Phase 1: there's no real multi-tenancy, so any handle renders the same
// mock creator. The dynamic segment exists to shape the route for Phase 2.
export default function HandlePage() {
  return <PublicPage creator={DEMO_CREATOR} />;
}
