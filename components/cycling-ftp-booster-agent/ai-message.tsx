import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const AiMessage = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <Box px="4" py="2" maxW="xl" borderRadius="md" bg="bg.subtle">
      {children}
    </Box>
  );
};
