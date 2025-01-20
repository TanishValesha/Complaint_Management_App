import bcrypt from "bcrypt";
import User from "@/models/userModel";
import dbConnect from "@/app/_lib/db";
import { SignJWT } from "jose";
import { serialize } from "cookie";

export async function POST(request: Request) {
  await dbConnect();

  const formData = await request.json();
  const user = await User.findOne({ email: formData.email });

  if (!user) return new Response("User Not Found", { status: 404 });

  const isMatch = await bcrypt.compare(formData.password, user.password);

  if (!isMatch) return new Response("Invalid Credentials", { status: 400 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // Generate a JWT token using jose
  const token = await new SignJWT({ id: user._id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);

  const response = new Response(JSON.stringify(token), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });

  response.headers.set(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600,
      sameSite: "strict",
      path: "/",
    })
  );

  return response;
}
