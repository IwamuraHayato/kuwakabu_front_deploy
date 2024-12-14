// frontend/app/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import Credentials from "next-auth/providers/credentials";
import getUserFromDb from './login/getUserFromDb';

export const { handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID, 
      clientSecret: process.env.AUTH_GITHUB_SECRET, 
    }),
    Credentials({
      credentials: {
        id: { label: "ID", type: "text" }, 
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 入力されたユーザー名とパスワードのチェック
        if (!credentials?.id || !credentials?.password) {
          throw new Error("id and password are required");
        }
    
        try {    
          // ユーザー名でユーザーを検索
          const user = await getUserFromDb(credentials.id, credentials.password);
    
          if (!user) {
            throw new Error("Invalid id or password");
          }
    
          // 認証が成功した場合、ユーザーオブジェクトを返す
          return { id: user.id, name: user.name};
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Authentication failed");
        }
      },
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
        session.user.id = token.id as string; // セッションにユーザー ID を保存
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, // Auth.js の秘密鍵を指定
  trustHost: true, 
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