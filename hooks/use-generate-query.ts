import { CyclingFtpBoosterFormSchema } from "@/utils/schema";
import { useQuery } from "@tanstack/react-query";

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

const fetchGenerateApi = async (
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

export const useGenerateQuery = (data?: CyclingFtpBoosterFormSchema) =>
  useQuery({
    queryKey: ["fetchGenerate", data],
    queryFn: () => fetchGenerateApi(data!),
    select: (data) => data,
    enabled: !!data,
    refetchOnWindowFocus: false,
  });
