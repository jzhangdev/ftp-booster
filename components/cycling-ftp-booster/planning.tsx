"use client";
import { fetchGenerateApi } from "@/data/fetch-generate-api";
import { Suspense, use } from "react";
import { Plan } from "./plan";

interface PlanningProps {
  fetchDataPromise: ReturnType<typeof fetchGenerateApi>;
}

const Planning = ({ fetchDataPromise }: PlanningProps) => {
  const data = use(fetchDataPromise);
  return <Plan data={data} isShowingPublicLink />;
};

export const PlanningContainer = ({
  fetchDataPromise,
}: Partial<PlanningProps>) => {
  if (!fetchDataPromise) return null;
  return (
    <Suspense>
      <Planning fetchDataPromise={fetchDataPromise} />
    </Suspense>
  );
};
