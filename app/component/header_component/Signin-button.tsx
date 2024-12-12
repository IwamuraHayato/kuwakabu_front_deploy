"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <button
      type="submit"
      onClick={() => signIn("github")}
      className="btn"
    >
      GitHubでログインする
    </button>
  );
}
