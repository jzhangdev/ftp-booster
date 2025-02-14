import { NextResponse } from "next/server";
import * as hub from "langchain/hub";
import { ChatOpenAI } from "@langchain/openai";
import { cookies } from "next/headers";
import { DetailedActivityResponse } from "@/types/strava";

export const POST = async (request: Request) => {
  const requestUrl = new URL(request.url);
  const cookieStore = await cookies();
  const payload = await request.json();
  const stravaAccessToken = cookieStore.get("strava:accessToken");

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
    oauthUrl.searchParams.append("state", JSON.stringify(payload));

    return NextResponse.json(
      {
        redirectUrl: oauthUrl.toString(),
      },
      {
        status: 401,
      }
    );
  };

  if (!stravaAccessToken || !stravaAccessToken.value) {
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

  if (activitiesResponse.status === 401) {
    return redirectToStravaOauth();
  }

  if (activitiesResponse.status === 200) {
    const activities =
      (await activitiesResponse.json()) as DetailedActivityResponse[];
    const rideActivities = activities.filter(
      ({ sport_type }) => sport_type === "Ride"
    );
    const prompt = await hub.pull("cyclist-ftp-booster");
    const model = new ChatOpenAI({
      model: "gpt-4o",
    });
    const output = await prompt.pipe(model).invoke({
      ...payload,
      activities: rideActivities.map(
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
      ),
    });

    return NextResponse.json(output);
  } else {
    return activitiesResponse;
  }
};
