import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const { searchParams } = request.nextUrl;
  const exchangeTokenResponse = await fetch(
    "https://www.strava.com/api/v3/oauth/token",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_APP_CLIENT_ID,
        client_secret: process.env.STRAVA_APP_CLIENT_SECRET,
        code: searchParams.get("code"),
        grant_type: "authorization_code",
      }),
    }
  );
  const data = await exchangeTokenResponse.json();
  if (!data) {
    return redirect("/");
  }
  cookieStore.set("strava:accessToken", data.access_token, {
    httpOnly: true,
  });
  while (cookieStore.get("strava:accessToken")) {
    return redirect(
      `/?formData=${searchParams.get("state")!}&isFromStravaOauth=true`
    );
  }
};
