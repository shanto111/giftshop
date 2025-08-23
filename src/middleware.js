import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const secret =
    "e5a03c4ad2f3a9b70962e97e1c79f54b7c3de41be53e59cfe1010a0131f6d7d3";
  const token = await getToken({ req, secret });
  const pathname = req.nextUrl.pathname;

  console.log("Middleware called!");
  console.log("Pathname:", pathname);
  console.log("Token:", token);

  if (!token) {
    console.log("No token found. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/dashboard/admin") && token.role !== "admin") {
    console.log("User role is not admin. Redirecting to /dashboard/user");
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }

  if (pathname.startsWith("/dashboard/user") && token.role !== "user") {
    console.log("User role is not user. Redirecting to /dashboard/admin");
    return NextResponse.redirect(new URL("/dashboard/admin", req.url));
  }

  console.log("Access granted to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
