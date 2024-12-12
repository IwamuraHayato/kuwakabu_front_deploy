import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null; // ユーザー ID を追加
    };
  }

  interface JWT {
    id?: string; // トークンに追加した ID
  }
}