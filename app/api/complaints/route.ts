import dbConnect from "@/app/_lib/db";
import { NextRequest } from "next/server";
import Complaint from "@/models/complaintModel";

export async function POST(request: NextRequest) {
  await dbConnect();

  const { title, description, category, priority } = await request.json();

  const newComplaint = new Complaint({
    title,
    description,
    category,
    priority,
  });

  await newComplaint.save();

  return new Response(JSON.stringify(newComplaint), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function GET(request: NextRequest) {
  return new Response("Welcome, Admin!");
}
