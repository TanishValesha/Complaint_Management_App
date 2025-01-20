import bcrypt from "bcrypt";
import User from "@/models/userModel";
import dbConnect from "@/app/_lib/db";

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.json();
  const email = formData.email;
  const hashedPassword = await bcrypt.hash(formData.password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    role: formData.role,
  });

  await newUser.save();

  return new Response(JSON.stringify(newUser), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
