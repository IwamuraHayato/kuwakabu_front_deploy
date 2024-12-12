"use client"; // クライアントコンポーネントであることを明示
"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="btn"
    >
      サインアウト
    </button>
  );
}