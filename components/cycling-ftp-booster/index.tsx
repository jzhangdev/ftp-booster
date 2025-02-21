"use client";
import { Form } from "./form";
import { useGenerateQuery } from "@/hooks/use-generate-query";
import { Plan } from "./plan";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { CyclingFtpBoosterFormSchema } from "@/utils/schema";
import { useQueryClient } from "@tanstack/react-query";

export const CyclistFtpBooster = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CyclingFtpBoosterFormSchema>();
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
        opacity={generateQuery.isFetching ? 0.5 : 1}
        transition={
          generateQuery.isFetching
            ? "opacity 0.2s 0.2s linear"
            : "opacity 0s 0s linear"
        }
      >
        {generateQuery.data && (
          <Plan data={generateQuery.data} isShowingPublicLink />
        )}
      </Container>
    </Container>
  );
};
