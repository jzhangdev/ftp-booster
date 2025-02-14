export interface DetailedActivityResponse {
  id: string;
  distance?: number;
  moving_time?: number;
  elapsed_time?: number;
  total_elevation_gain?: number;
  sport_type: "Ride";
  average_watts?: number;
  kilojoules?: number;
}
