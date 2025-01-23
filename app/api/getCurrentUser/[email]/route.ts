import { getCurrentUser } from "@/app/_lib/getCurrentUser";
import dbConnect from "@/app/_lib/db";
// import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { email: string } }) {
  await dbConnect();

  const { email } = await params;
  console.log(email);

  if (!email) {
    return new Response(JSON.stringify({ error: "Email ID is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
  const user = await getCurrentUser(email);

  return new Response(JSON.stringify(user));
}
