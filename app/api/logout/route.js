import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json(
      { message: "Logged out successfully" },
      {
        headers: {
          "Set-Cookie": `authToken=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging out", error: error.message },
      { status: 500 }
    );
  }
}
