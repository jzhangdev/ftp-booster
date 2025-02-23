import { CyclingFtpBoosterPlan } from "@/data/fetch-generate-api";
import {
  Box,
  Card,
  Heading,
  Text,
  Stack,
  Flex,
  Em,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

interface Props {
  data: CyclingFtpBoosterPlan;
  isShowingPublicLink?: boolean;
}

export const Plan = ({ data, isShowingPublicLink = false }: Props) => {
  return (
    <Card.Root>
      <Card.Header>
        {isShowingPublicLink && (
          <ChakraLink outline="none" asChild>
            <Link href={`/plan/cycling/${data.id}`}>
              <LuExternalLink /> View in public link(expired after 90 days)
            </Link>
          </ChakraLink>
        )}
        {data.summary}
      </Card.Header>
      <Card.Body>
        <Stack>
          {data.weeks.map((week, weekIndex) => {
            return (
              <Box key={weekIndex}>
                <Heading size="lg">{week.summary}</Heading>
                {week.days.map((day, dayIndex) => {
                  return (
                    <Box key={dayIndex} marginY="2">
                      <Heading size="md">{day.details}</Heading>
                      <Box maxW="md">
                        {day.stages.map((stage, stageIndex) => (
                          <Box
                            key={stageIndex}
                            bgColor={stage.color}
                            color="white"
                            paddingX="2"
                          >
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                <Em>{stage.name}</Em>
                              </Text>
                              <Text fontWeight="bold">
                                {stage.duration}min@{stage.intensity}W
                              </Text>
                            </Flex>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
