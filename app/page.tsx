import { CyclistFtpBooster } from "@/components/cyclist-ftp-booster";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <CyclistFtpBooster />
    </Suspense>
  );
}
