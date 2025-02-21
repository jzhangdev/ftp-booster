"use client";
import { Form } from "./form";
import { fetchGenerateApi } from "@/data/fetch-generate-api";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { PlanningContainer } from "./planning";

export const CyclistFtpBooster = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fetchDataPromise, setFetchDataPromise] = useState<
    undefined | ReturnType<typeof fetchGenerateApi>
  >();

  return (
    <Container paddingTop="24">
      <Container maxW="4xl">
        <Form
          isSubmitting={isSubmitting}
          onSubmit={(formData) => {
            setIsSubmitting(true);
            setFetchDataPromise(
              fetchGenerateApi(formData).finally(() => {
                setIsSubmitting(false);
              })
            );
          }}
        />
      </Container>
      <Container paddingTop="12" maxW="4xl">
        <PlanningContainer fetchDataPromise={fetchDataPromise} />
      </Container>
    </Container>
  );
};
