import { Box, Text } from "@chakra-ui/react";
import { MessageMotion } from "./message-motion";

interface Props {
  question: string;
  answer: string;
}

export const QuestionMessage = ({ question, answer }: Props) => {
  return (
    <MessageMotion>
      <Box px="4" py="2" maxW="xl" borderRadius="md" bg="bg.subtle">
        <Text>Question: {question}</Text>
        <Text>Answer: {answer}</Text>
      </Box>
    </MessageMotion>
  );
};
