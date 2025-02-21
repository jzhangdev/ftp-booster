"use client";
import {
  Button,
  Card,
  Center,
  Fieldset,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Field } from "@/components/ui/field";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CyclingFtpBoosterFormSchema,
  cyclingFtpBoosterFormSchema,
} from "@/utils/schema";
import { useQueryState, parseAsJson, parseAsBoolean } from "nuqs";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface Props {
  isSubmitting: boolean;
  onSubmit: (data: CyclingFtpBoosterFormSchema) => Promise<void> | void;
}

export const Form = ({ isSubmitting, onSubmit }: Props) => {
  const [isConnectedToStrava, setIsConnectedToStrava] = useQueryState(
    "isConnectedToStrava",
    parseAsBoolean.withDefault(false)
  );
  const [formData, setFormData] = useQueryState(
    "formData",
    parseAsJson(cyclingFtpBoosterFormSchema.parse).withDefault({
      current: 120,
      target: 150,
      daysOfWeek: 3,
      hoursOfDay: 2,
    })
  );

  const formRef = useRef<HTMLFormElement>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof cyclingFtpBoosterFormSchema>>({
    defaultValues: formData,
    resolver: zodResolver(cyclingFtpBoosterFormSchema),
  });

  useEffect(() => {
    if (isConnectedToStrava && formRef.current) {
      setIsConnectedToStrava(false);
      onSubmit(formData);
    }
  }, [
    isConnectedToStrava,
    formRef,
    formData,
    onSubmit,
    setIsConnectedToStrava,
  ]);

  return (
    <Card.Root>
      <Card.Header>
        <Heading>🚴 Cycling FTP Booster</Heading>
        <Text>
          Input your current and target FTP, along with your schedule
          preferences, to receive customized workouts designed to enhance your
          cycling performance.
        </Text>
        <Text>
          Our tool integrates with Strava, leveraging your recent activities to
          fine-tune and personalize your training plan for optimal results.
        </Text>
      </Card.Header>
      <Card.Body>
        <form
          ref={formRef}
          onSubmit={handleSubmit(async (data) => {
            setFormData(data);
            await onSubmit(data);
          })}
        >
          <Fieldset.Root>
            <Fieldset.Content>
              <HStack>
                <Field
                  label="Current FTP (W)"
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
                  label="Target FTP (W)"
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
            <Center>
              <Button
                type="submit"
                bgColor="#fc5200"
                _hover={{ bgColor: "#cc4200" }}
                loading={isSubmitting}
                disabled={isSubmitting}
                fontWeight="bold"
                overflow="hidden"
                spinner={
                  <motion.span
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                  >
                    🚴🚴‍♀️🚴‍♂️🚴🚴‍♀️🚴‍♂️🚴🚴‍♀️🚴‍♂️
                  </motion.span>
                }
              >
                🚀 Launch with Strava
              </Button>
            </Center>
          </Fieldset.Root>
        </form>
      </Card.Body>
    </Card.Root>
  );
};
