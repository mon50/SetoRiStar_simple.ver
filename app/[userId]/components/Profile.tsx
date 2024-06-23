import { ConnectUserInfo } from "@/types/AccountType";
import Image from "next/image";
import React from "react";

const UserProfile = ({ user }: { user: ConnectUserInfo }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
      <div className="relative rounded-full w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 shadow-md overflow-hidden">
        <Image
          src={user.display_image}
          alt="ユーザーアイコン"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold">{user.display_name}</h2>
        <h4 className="text-lg sm:text-xl mt-2">プロフィール文章</h4>
      </div>
    </div>
  );
};

export default UserProfile;
