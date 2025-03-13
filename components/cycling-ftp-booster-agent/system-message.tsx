import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { MessageMotion } from "./message-motion";

export const SystemMessage = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <MessageMotion>
      <Box px="4" py="2" maxW="xl" borderRadius="md" bg="bg.subtle">
        {children}
      </Box>
    </MessageMotion>
  );
};
