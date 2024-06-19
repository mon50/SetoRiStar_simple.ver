import { ConnectUserInfo } from "@/types/AccountType";
import React from "react";

const UserProfile = ({ user }: { user: ConnectUserInfo }) => {
  return (
    <div className="flex flex-row m-10 gap-10 items-center">
      <div className="relative rounded-full w-40 h-40 bg-gray-200 shadow-md overflow-hidden">
        <img
          src={user.display_image}
          alt="ユーザーアイコン"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold">{user.display_name}</h2>
        <h4 className="text-xl">プロフィール文章</h4>
      </div>
    </div>
  );
};

export default UserProfile;
