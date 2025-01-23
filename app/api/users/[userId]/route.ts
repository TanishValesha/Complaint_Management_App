import dbConnect from "@/app/_lib/db";
import { NextRequest } from "next/server";
import User from "@/models/userModel";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = await params;
  console.log(id);

  if (!id) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
  const user = await User.findOne({ _id: id });

  return new Response(JSON.stringify(user), { status: 200 });
}
