import { Planning } from "@/components/cyclist-ftp-booster/planning";
import { CyclistFtpBoosterPlanning } from "@/hooks/use-generate-query";
import { Container } from "@chakra-ui/react";
import { Redis } from "@upstash/redis";

export default async function Share({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const redis = Redis.fromEnv();
  const planning: null | Omit<CyclistFtpBoosterPlanning, "id"> =
    await redis.get(`share:${id}`);

  if (!planning) {
    return <div>404</div>;
  }

  const data: CyclistFtpBoosterPlanning = { id, ...planning };

  return (
    <Container paddingY="6" maxW="4xl">
      <Planning data={data} />
    </Container>
  );
}
