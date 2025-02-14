"use client";
import { Form } from "./form";
import { useGenerateQuery } from "@/hooks/use-generate-query";
import { Planning } from "./planning";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { CyclistFtpBoosterFormSchema } from "@/utils/schema";
import { useQueryClient } from "@tanstack/react-query";

export const CyclistFtpBooster = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CyclistFtpBoosterFormSchema>();
  const generateQuery = useGenerateQuery(formData);

  return (
    <Container paddingTop="24">
      <Container maxW="4xl">
        <Form
          isSubmitting={generateQuery.isFetching}
          onSubmit={(formData) => {
            setFormData(formData);
            queryClient.invalidateQueries({
              queryKey: ["fetchGenerate"],
            });
          }}
        />
      </Container>
      <Container
        paddingTop="12"
        maxW="4xl"
        opacity={generateQuery.isStale ? 0.5 : 1}
        transition={
          generateQuery.isStale
            ? "opacity 0.2s 0.2s linear"
            : "opacity 0s 0s linear"
        }
      >
        {generateQuery.data && <Planning data={generateQuery.data} />}
      </Container>
    </Container>
  );
};
