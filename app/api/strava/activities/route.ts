import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookie = await cookies();
  const stravaAccessToken = cookie.get("strava:accessToken");
  if (!stravaAccessToken) {
    return new NextResponse(null, {
      status: 401,
    });
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
  if (activitiesResponse.status === 200) {
    const data = await activitiesResponse.json();
    return NextResponse.json(data);
  } else {
    return activitiesResponse;
  }
};
