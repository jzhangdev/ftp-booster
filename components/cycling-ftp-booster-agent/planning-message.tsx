import type { CyclingFtpBoosterPlan } from "@/types/plan";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { MessageMotion } from "./message-motion";

interface Props {
  data: CyclingFtpBoosterPlan;
}

export const PlanningMessage = ({ data }: Props) => {
  return (
    <MessageMotion>
      <Card className="max-w-4xl overflow-hidden border-emerald-200/80 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-3 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-sky-50 pb-4">
          <Badge className="w-fit bg-emerald-600 text-white">Training Plan</Badge>
          <CardTitle className="text-base font-medium leading-6 text-slate-700">
            {data.summary}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {data.weeks.map((week, weekIndex) => {
            return (
              <section key={`${week.summary}-${weekIndex}`} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-800">{week.summary}</h3>
                  <Badge variant="outline">Week {weekIndex + 1}</Badge>
                </div>
                <div className="space-y-3">
                  {week.days.map((day, dayIndex) => {
                    return (
                      <div key={`${day.details}-${dayIndex}`} className="rounded-md border border-slate-200 bg-white p-3">
                        <p className="mb-2 text-sm font-medium text-slate-700">{day.details}</p>
                        <div className="space-y-1.5">
                          {day.stages.map((stage, stageIndex) => (
                            <div
                              key={`${stage.name}-${stageIndex}`}
                              className="rounded px-2 py-1 text-xs text-white"
                              style={{ backgroundColor: stage.color }}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold italic">{stage.name}</span>
                                <span className="font-semibold">
                                  {stage.duration}min@{stage.intensity}W
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {weekIndex < data.weeks.length - 1 ? <Separator className="mt-4" /> : null}
              </section>
            );
          })}
        </CardContent>
      </Card>
    </MessageMotion>
  );
};
