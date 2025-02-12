"use client";
import { Form } from "./form";
import { useGenerateMutation } from "@/hooks/use-generate-query";
import { Planning } from "./planning";
import { Container } from "@chakra-ui/react";

export const CyclistFtpBooster = () => {
  const { data, mutateAsync, isPending } = useGenerateMutation();

  return (
    <Container paddingTop="24">
      <Container maxW="xl">
        <Form
          isSubmitting={isPending}
          onSubmit={async (data) => {
            await mutateAsync(data);
          }}
        />
      </Container>
      <Container paddingTop="12" maxW="xxl">
        {data && <Planning data={data} />}
      </Container>
    </Container>
  );
};
