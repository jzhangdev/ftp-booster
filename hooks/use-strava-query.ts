import { useQuery } from "@tanstack/react-query";

export const useStravaActivitiesQuery = () =>
  useQuery({
    queryKey: ["fetchStravaActivities"],
    queryFn: async () => {
      const response = await fetch("/api/strava/activities");
      const data = await response.json();
      return data;
    },
  });

export const useStravaAthleteQuery = () =>
  useQuery({
    queryKey: ["fetchStravaAthlete"],
    queryFn: async () => {
      const response = await fetch("/api/strava/athlete");
      const data = await response.json();
      return data;
    },
  });
