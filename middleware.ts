import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user?: { id: string; role: string };
  }
}

export async function middleware(request: NextRequest) {
  console.log("Middleware Triggered");
  const token = request.cookies.get("token");

  if (!token) {
    return new Response("No token , authorization denied", { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    const url = request.nextUrl.pathname;

    if (
      url.startsWith("/api/complaints") &&
      request.method !== "POST" &&
      payload.role !== "Admin"
    ) {
      return NextResponse.json(
        { message: "Forbidden: Admins only" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" + "or" + error },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/admin", "/api/complaints", "/api/getCurrentUser"],
};
