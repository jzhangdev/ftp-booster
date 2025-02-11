import { z } from "zod";

export const cyclistFtpBoosterFormSchema = z.object({
  current: z.number().min(50).positive(),
  target: z.number().min(0).positive(),
  daysOfWeek: z.number().min(0).positive(),
  hoursOfDay: z.number().min(0).positive(),
});

export type CyclistFtpBoosterFormSchema = z.infer<
  typeof cyclistFtpBoosterFormSchema
>;
