import { CyclistFtpBoosterPlanning } from "@/hooks/use-generate-query";
import { Box, Card, Heading, Text, Stack } from "@chakra-ui/react";

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
                <Heading size="md">{week.summary}</Heading>
                {week.days.map((day, dayIndex) => {
                  return <Text key={dayIndex}>{day.details}</Text>;
                })}
              </Box>
            );
          })}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
