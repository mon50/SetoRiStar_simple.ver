import AddLiveButton from "@/components/sidebarL/items/AddLiveButton";
import CalenderButton from "@/components/sidebarL/items/CalenderButton";
import UserButton from "@/components/sidebarL/items/UserButton";
import React from "react";

const SidebarL = () => {
  return (
    <div className="h-full flex flex-col justify-between items-center rounded w-16 sm:w-20 bg-secondary-light pt-4 pb-4">
      <div className="flex flex-col gap-2">
        <CalenderButton />
        <AddLiveButton />
      </div>
      <UserButton />
    </div>
  );
};

export default SidebarL;
