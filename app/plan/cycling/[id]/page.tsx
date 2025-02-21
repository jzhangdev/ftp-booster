import { Plan } from "@/components/cycling-ftp-booster/plan";
import { CyclingFtpBoosterPlan } from "@/data/fetch-generate-api";
import { Container } from "@chakra-ui/react";
import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";

export default async function Share({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const redis = Redis.fromEnv();
  const plan: null | Omit<CyclingFtpBoosterPlan, "id"> = await redis.get(
    `plan:cycling:${id}`
  );

  if (!plan) {
    notFound();
  }

  const data: CyclingFtpBoosterPlan = { id, ...plan };

  return (
    <Container paddingY="6" maxW="4xl">
      <Plan data={data} />
    </Container>
  );
}
