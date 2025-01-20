import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

declare module "next/server" {
  interface NextRequest {
    user?: { id: string; role: string };
  }
}

export async function middleware(request: NextRequest) {
  console.log("Middleware Triggered");
  let token;
  const requestHeaders = new Headers(request.headers);
  const authHeader = requestHeaders.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return new Response("No token , authorization denied", { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log(payload);
    const url = request.nextUrl.pathname;

    if (url.startsWith("/api/complaint") && payload.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admins only" },
        { status: 403 }
      );
    }

    if (url.startsWith("/api/user") && payload.role !== "seller") {
      return NextResponse.json(
        { message: "Forbidden: Sellers only" },
        { status: 403 }
      );
    }

    return NextResponse.next(); // Proceed to the next step
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" + "or" + error },
      { status: 401 }
    );
  }
  // request.user = payload as { id: string; role: string };
  // return new Response("Token Verified!");
}

export const config = {
  matcher: ["/api/admin", "/api/demo"],
};
