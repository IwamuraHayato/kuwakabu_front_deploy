// frontend/app/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID, 
      clientSecret: process.env.AUTH_GITHUB_SECRET, 
    }),
  ],
  callbacks: {
    // JWT コールバック: トークンにユーザー ID を追加
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // サインイン時にトークンに ID を保存
      }
      return token;
    },
    // セッションコールバック: セッション情報にユーザー ID を追加
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id; // セッションにユーザー ID を保存
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // Auth.js の秘密鍵を指定
});

// ミドルウェアとして認証チェックを行う関数を追加
export async function auth(req) {
  console.log("Middleware triggered for:", req.url);
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    // トークンがない場合はログインページにリダイレクト
    console.log("No token found, redirecting to signin");
    const url = new URL("/api/auth/signin", req.url);
    return NextResponse.redirect(url);
  }

  // トークンがある場合はリクエストを進行
  console.log("Token found, proceeding to next middleware");
  return NextResponse.next();
}