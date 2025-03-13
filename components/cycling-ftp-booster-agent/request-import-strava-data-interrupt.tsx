import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface Props {
  isLoading: boolean;
  onYes: () => void;
  onNo: () => void;
}

export const RequestImportStravaDataInterrupt = ({
  isLoading,
  onYes,
  onNo,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Box p="2" maxW="xl" borderRadius="md" bg="bg.subtle">
      <Text>{children}</Text>
      <ButtonGroup>
        <Button variant="plain" onClick={onYes} disabled={isLoading}>
          Yes
        </Button>
        <Button variant="plain" onClick={onNo} disabled={isLoading}>
          No
        </Button>
      </ButtonGroup>
    </Box>
  );
};
