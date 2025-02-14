import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookieStore = await cookies();
  const stravaAccessToken = cookieStore.get("strava:accessToken");
  if (!stravaAccessToken) {
    return new NextResponse(null, {
      status: 401,
    });
  }
  const athleteResponse = await fetch("https://www.strava.com/api/v3/athlete", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${stravaAccessToken.value}`,
    },
  });
  if (athleteResponse.status === 200) {
    const data = await athleteResponse.json();
    return NextResponse.json(data);
  } else {
    return athleteResponse;
  }
};
