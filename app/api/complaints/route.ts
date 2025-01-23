import dbConnect from "@/app/_lib/db";
import User from "@/models/userModel";
import { NextRequest } from "next/server";
import Complaint from "@/models/complaintModel";

export async function POST(request: NextRequest) {
  await dbConnect();

  const { title, description, category, priority, user } = await request.json();

  const complaintOwner = await User.findById(user);
  console.log(complaintOwner);

  const newComplaint = new Complaint({
    title,
    description,
    category,
    priority,
    userId: user,
    ownerEmail: complaintOwner.email,
  });

  await newComplaint.save();

  return new Response(JSON.stringify(newComplaint), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}

export async function GET() {
  await dbConnect();

  const complaints = await Complaint.find({});

  return new Response(JSON.stringify(complaints), {
    headers: { "Content-Type": "application/json" },
  });
}
