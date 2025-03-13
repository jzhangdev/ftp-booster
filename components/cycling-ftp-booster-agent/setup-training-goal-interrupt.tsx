import { Box, Button, Center, Fieldset, HStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CyclingFtpBoosterFormSchema,
  cyclingFtpBoosterFormSchema,
} from "@/utils/schema";
import { MessageMotion } from "./message-motion";

interface Props {
  isSubmitting: boolean;
  onSubmit: (data: CyclingFtpBoosterFormSchema) => void;
}

export const SetupTrainingGoalInterrupt = ({
  isSubmitting,
  onSubmit,
}: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof cyclingFtpBoosterFormSchema>>({
    defaultValues: {
      current: 120,
      target: 150,
      daysOfWeek: 3,
      hoursOfDay: 2,
      isConnectToStrava: false,
    },
    resolver: zodResolver(cyclingFtpBoosterFormSchema),
  });

  return (
    <MessageMotion>
      <Box px="4" py="2" maxW="xl" borderRadius="md" bg="bg.subtle">
        <form
          onSubmit={handleSubmit(async (data) => {
            onSubmit(data);
          })}
        >
          <Fieldset.Root disabled={isSubmitting}>
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
            <Center>
              <Button
                type="submit"
                disabled={isSubmitting}
                fontWeight="bold"
                overflow="hidden"
              >
                🚀 Launch
              </Button>
            </Center>
          </Fieldset.Root>
        </form>
      </Box>
    </MessageMotion>
  );
};
