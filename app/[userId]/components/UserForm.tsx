// UserForm.tsx
"use client";
import History from "@/app/[userId]/components/History";
import Profile from "@/app/[userId]/components/Profile";
import { useUserInfo } from "@/hooks/useUserInfo";
import React from "react";

const UserForm = ({ authId }: { authId: string }) => {
  const { loading, userId, user } = useUserInfo(authId);

  if (authId === "") {
    return <p>ユーザー情報が見つかりません。</p>;
  }

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <Profile user={user} />
      <hr className="border-t-2 border-gray-300 my-4" />
      {userId && <History userId={userId} />}
    </div>
  );
};

export default UserForm;
