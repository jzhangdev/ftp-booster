import { CyclistFtpBoosterPlanning } from "@/hooks/use-generate-query";
import { Box, Card, Heading, Text, Stack, Flex, Em } from "@chakra-ui/react";

interface Props {
  data: CyclistFtpBoosterPlanning;
}

export const Planning = ({ data }: Props) => {
  return (
    <Card.Root>
      <Card.Header>{data.summary}</Card.Header>
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
                      <Box width="md">
                        {day.stages.map((stage, stageIndex) => (
                          <Box
                            key={stageIndex}
                            bgColor={stage.color}
                            color="white"
                            borderRadius="md"
                            paddingX="2"
                          >
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                <Em>{stage.name}</Em>
                              </Text>
                              <Text fontWeight="bold">
                                {stage.duration}min@{stage.intensity}w
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
