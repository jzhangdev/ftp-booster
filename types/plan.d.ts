export interface CyclingFtpBoosterPlan {
  id: string;
  summary: string;
  weeks: Array<{
    summary: string;
    days: Array<{
      details: string;
      stages: Array<{
        name: string;
        duration: number;
        intensity: number;
        color: string;
      }>;
    }>;
  }>;
}
