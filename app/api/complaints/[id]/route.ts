import dbConnect from "@/app/_lib/db";
import { NextRequest, NextResponse } from "next/server";
import Complaint from "@/models/complaintModel";
import sendEmail from "@/utils/sendEmail";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  response: NextResponse
) {
  await dbConnect();
  const { id } = await params;

  const complaint = await Complaint.findById(id);
  if (!complaint) {
    return NextResponse.json(
      { message: "Complaint not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ complaint }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  response: NextResponse
) {
  await dbConnect();
  const { id } = await params;
  console.log("Delete");

  await Complaint.findByIdAndDelete(id);

  return new Response("Deleted", {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  response: NextResponse
) {
  try {
    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const { status } = body;

    console.log("Updating complaint status:", { id, status });

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return NextResponse.json(
        { message: "Complaint not found" },
        { status: 404 }
      );
    }

    complaint.status = status;
    await complaint.save();

    if (status === "Resolved") {
      const userEmail = complaint.ownerEmail;
      const subject = "Your Complaint Has Been Resolved";
      const html = `
        <p>Your complaint titled "<strong>${
          complaint.title
        }</strong>" has been marked as <strong>Resolved</strong>.</p>
        <p>Complaint Date of Submission: ${new Date(
          complaint.dateSubmitted
        )}</p>
        <p>Thank you for your patience!</p>
        <p>Best regards,</p>
        <p>Admin Team</p>
      `;
      await sendEmail(userEmail, subject, html);
      console.log("Email sent to", userEmail);
    }

    return NextResponse.json(
      {
        message: "Complaint status updated successfully",
        complaint,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}
