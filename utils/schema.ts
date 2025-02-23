import { z } from "zod";

export const cyclingFtpBoosterFormSchema = z.object({
  current: z.number().min(50).positive(),
  target: z.number().min(0).positive(),
  daysOfWeek: z.number().min(0).positive(),
  hoursOfDay: z.number().min(0).positive(),
  isConnectToStrava: z.boolean({ coerce: true }),
});

export type CyclingFtpBoosterFormSchema = z.infer<
  typeof cyclingFtpBoosterFormSchema
>;
