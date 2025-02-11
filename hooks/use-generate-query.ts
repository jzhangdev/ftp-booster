import { CyclistFtpBoosterFormSchema } from "@/utils/schema";
import { useMutation } from "@tanstack/react-query";

export interface CyclistFtpBoosterPlanning {
  summary: string;
  weeks: Array<{
    summary: string;
    days: Array<{
      details: string;
    }>;
  }>;
}

const fetchGenerateApi = async (
  payload: CyclistFtpBoosterFormSchema
): Promise<CyclistFtpBoosterPlanning> => {
  const response = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return await response.json();
};

export const useGenerateMutation = () =>
  useMutation({
    mutationFn: (data?: CyclistFtpBoosterFormSchema) => fetchGenerateApi(data!),
  });
