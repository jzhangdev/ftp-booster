import { CyclingFtpBoosterAgent } from "@/components/cycling-ftp-booster-agent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const graphApi = process.env.GRAPH_API ?? "";

  return (
    <Suspense>
      <CyclingFtpBoosterAgent graphApi={graphApi} />
    </Suspense>
  );
}
