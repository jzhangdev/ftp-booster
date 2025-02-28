import { CyclingFtpBoosterAgent } from "@/components/cycling-ftp-booster-agent";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <CyclingFtpBoosterAgent />
    </Suspense>
  );
}
