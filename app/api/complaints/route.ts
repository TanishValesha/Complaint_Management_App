import dbConnect from "@/app/_lib/db";
import User from "@/models/userModel";
import { NextRequest } from "next/server";
import Complaint from "@/models/complaintModel";
import sendEmail from "@/utils/sendEmail";

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

  const adminEmail = "owner3005@gmail.com.com";
  const subject = "New Complaint Submitted";
  const html = `
      <p>Dear Admin,</p>
      <p>A new complaint has been submitted:</p>
      <ul>
        <li><strong>Title:</strong> ${title}</li>
        <li><strong>Description:</strong> ${description}</li>
        <li><strong>Category:</strong> ${category}</li>
        <li><strong>Priority:</strong> ${priority}</li>
      </ul>
      <p>Please review the complaint at your earliest convenience.</p>
      <p>Best regards,</p>
      <p>Your Complaint Management System</p>
    `;
  await sendEmail(adminEmail, subject, html);

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
