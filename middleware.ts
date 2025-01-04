// frontend/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("Middleware triggered for:", req.url);

  const token = await getToken({ req, secret: "mCXX3Xoeqckp75fQwv8XTqM9WajHYltjzjkZEp37t38=" });
  // const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    console.log("No token found. Redirecting to signin...");
    const url = new URL("/login", req.url); // サインインページにリダイレクト
    return NextResponse.redirect(url);
  }

  console.log("Token found. Proceeding to the requested page.");
  return NextResponse.next(); // 認証成功時、リクエストを続行
}

export const config = {
  // matcher: ["/mypage/:path*", "/mypage", "/submit", ],
  matcher: [], 
};
