import { CyclingFtpBoosterPlan } from "@/types/plan";
import { Box, Em, Flex, Heading, Stack, Text } from "@chakra-ui/react";

interface Props {
  data: CyclingFtpBoosterPlan;
}

export const PlanningMessage = ({ data }: Props) => {
  return (
    <Box px="4" py="2" maxW="xl" borderRadius="md" bg="bg.subtle">
      <Text>{data.summary}</Text>
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
    </Box>
  );
};
