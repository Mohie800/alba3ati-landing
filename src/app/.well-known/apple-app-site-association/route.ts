import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appID: "8Q3G5Z7H7D.com.alba3ati.app",
            paths: ["/join/*"],
          },
        ],
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
