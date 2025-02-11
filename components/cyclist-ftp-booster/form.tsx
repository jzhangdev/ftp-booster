"use client";
import { Button, Card, Fieldset, Heading, HStack } from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Field } from "@/components/ui/field";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CyclistFtpBoosterFormSchema,
  cyclistFtpBoosterFormSchema,
} from "@/utils/schema";

interface Props {
  isSubmitting: boolean;
  onSubmit: (data: CyclistFtpBoosterFormSchema) => Promise<void>;
}

export const Form = ({ isSubmitting, onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof cyclistFtpBoosterFormSchema>>({
    defaultValues: {
      current: 120,
      target: 150,
      daysOfWeek: 3,
      hoursOfDay: 2,
    },
    resolver: zodResolver(cyclistFtpBoosterFormSchema),
  });

  return (
    <Card.Root>
      <Card.Header>
        <Heading>🚴 Cycling FTP Booster</Heading>
      </Card.Header>
      <Card.Body>
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data);
          })}
        >
          <Fieldset.Root>
            <Fieldset.Content>
              <HStack>
                <Field
                  label="Current FTP"
                  invalid={!!errors.current}
                  errorText={errors.current?.message}
                >
                  <NumberInputRoot
                    inputMode="numeric"
                    size="md"
                    min={0}
                    max={2000}
                    step={5}
                  >
                    <NumberInputField
                      {...register("current", { valueAsNumber: true })}
                    />
                  </NumberInputRoot>
                </Field>
                <Field
                  label="Target FTP"
                  invalid={!!errors.target}
                  errorText={errors.target?.message}
                >
                  <NumberInputRoot
                    inputMode="numeric"
                    size="md"
                    min={0}
                    max={2000}
                    step={5}
                  >
                    <NumberInputField
                      {...register("target", { valueAsNumber: true })}
                    />
                  </NumberInputRoot>
                </Field>
              </HStack>
              <HStack>
                <Field
                  label="Day of week"
                  invalid={!!errors.daysOfWeek}
                  errorText={errors.daysOfWeek?.message}
                >
                  <NumberInputRoot
                    inputMode="numeric"
                    size="md"
                    min={0}
                    max={7}
                  >
                    <NumberInputField
                      {...register("daysOfWeek", { valueAsNumber: true })}
                    />
                  </NumberInputRoot>
                </Field>
                <Field
                  label="Hours of day"
                  invalid={!!errors.hoursOfDay}
                  errorText={errors.hoursOfDay?.message}
                >
                  <NumberInputRoot
                    inputMode="numeric"
                    size="md"
                    min={0}
                    max={12}
                  >
                    <NumberInputField
                      {...register("hoursOfDay", { valueAsNumber: true })}
                    />
                  </NumberInputRoot>
                </Field>
              </HStack>
            </Fieldset.Content>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              🚀 Launch
            </Button>
          </Fieldset.Root>
        </form>
      </Card.Body>
    </Card.Root>
  );
};
