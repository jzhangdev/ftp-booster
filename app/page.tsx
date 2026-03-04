"use client";

import { Suspense } from "react";
import { Agent } from "./agent";

export default function Home() {
  return (
    <Suspense>
      <Agent />
    </Suspense>
  );
}
