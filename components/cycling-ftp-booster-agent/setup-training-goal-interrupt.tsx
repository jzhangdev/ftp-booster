import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CyclingFtpBoosterFormSchema,
  cyclingFtpBoosterFormSchema,
} from "@/utils/schema";

import { MessageMotion } from "./message-motion";

interface Props {
  isSubmitting: boolean;
  onSubmit: (data: CyclingFtpBoosterFormSchema) => void;
  title?: string;
}

export const SetupTrainingGoalInterrupt = ({
  isSubmitting,
  onSubmit,
  title,
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
      <Card className="max-w-3xl border-emerald-300/70 bg-emerald-50/85 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-emerald-900">
            {title ?? "Enter your training goals:"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <form
            className="space-y-4"
            onSubmit={handleSubmit(async (data) => {
              onSubmit(data);
            })}
          >
            <fieldset disabled={isSubmitting} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="current">Current FTP (W)</Label>
                  <Input
                    id="current"
                    type="number"
                    min={0}
                    max={2000}
                    step={5}
                    {...register("current", { valueAsNumber: true })}
                  />
                  {errors.current ? (
                    <p className="text-sm text-red-600">{errors.current.message}</p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="target">Target FTP (W)</Label>
                  <Input
                    id="target"
                    type="number"
                    min={0}
                    max={2000}
                    step={5}
                    {...register("target", { valueAsNumber: true })}
                  />
                  {errors.target ? (
                    <p className="text-sm text-red-600">{errors.target.message}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="daysOfWeek">Day of week</Label>
                  <Input
                    id="daysOfWeek"
                    type="number"
                    min={0}
                    max={7}
                    {...register("daysOfWeek", { valueAsNumber: true })}
                  />
                  {errors.daysOfWeek ? (
                    <p className="text-sm text-red-600">{errors.daysOfWeek.message}</p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="hoursOfDay">Hours of day</Label>
                  <Input
                    id="hoursOfDay"
                    type="number"
                    min={0}
                    max={12}
                    {...register("hoursOfDay", { valueAsNumber: true })}
                  />
                  {errors.hoursOfDay ? (
                    <p className="text-sm text-red-600">{errors.hoursOfDay.message}</p>
                  ) : null}
                </div>
              </div>
            </fieldset>

            <div className="flex justify-center pt-1">
              <Button type="submit" disabled={isSubmitting} className="font-bold">
                🚀 Launch
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MessageMotion>
  );
};
