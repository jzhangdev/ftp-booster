import { CyclingFtpBoosterFormSchema } from "@/utils/schema";

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

export const fetchGenerateApi = async (
  payload: CyclingFtpBoosterFormSchema
): Promise<CyclingFtpBoosterPlan> => {
  const response = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify(payload),
    redirect: "follow",
  });
  if (response.status === 401) {
    const { redirectUrl } = await response.json();
    window.location.href = redirectUrl;
    return Promise.reject();
  }

  return await response.json();
};
