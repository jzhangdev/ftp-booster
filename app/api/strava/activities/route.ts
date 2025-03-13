import { DetailedActivityResponse } from "@/types/strava";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const requestUrl = new URL(request.url);
  const cookie = await cookies();
  const stravaAccessToken = cookie.get("strava:accessToken");

  const redirectToStravaOauth = () => {
    const oauthUrl = new URL("https://www.strava.com/oauth/authorize");
    const redirectUrl = new URL(`${requestUrl.origin}/api/oauth/strava/token`);
    oauthUrl.searchParams.append(
      "client_id",
      process.env.STRAVA_APP_CLIENT_ID!
    );
    oauthUrl.searchParams.append("redirect_uri", redirectUrl.toString());
    oauthUrl.searchParams.append("response_type", "code");
    oauthUrl.searchParams.append("scope", "activity:read_all,profile:read_all");

    return NextResponse.json(
      {
        redirectUrl: oauthUrl.toString(),
      },
      {
        status: 401,
      }
    );
  };

  if (!stravaAccessToken) {
    return redirectToStravaOauth();
  }

  const activitiesResponse = await fetch(
    "https://www.strava.com/api/v3/athlete/activities",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stravaAccessToken.value}`,
      },
    }
  );

  switch (activitiesResponse.status) {
    case 200:
      const activities =
        (await activitiesResponse.json()) as DetailedActivityResponse[];
      const rideActivities = activities.filter(
        ({ sport_type }) => sport_type === "Ride"
      );
      const response = rideActivities.map(
        ({
          distance,
          moving_time,
          total_elevation_gain,
          average_watts,
          kilojoules,
        }) => ({
          distance,
          moving_time,
          total_elevation_gain,
          average_watts,
          kilojoules,
        })
      );
      return NextResponse.json(response);
    case 401:
      return redirectToStravaOauth();
    default:
      return activitiesResponse;
  }
};
