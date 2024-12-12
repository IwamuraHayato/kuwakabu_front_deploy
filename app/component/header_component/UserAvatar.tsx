"use client";

import { useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="">
      <img
        src={session.user.image}
        alt="User Avatar"
        className="w-16 h-16 rounded-full object-cover"
      />
    </div>
  );
}