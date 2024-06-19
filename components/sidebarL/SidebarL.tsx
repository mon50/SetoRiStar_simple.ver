import CalenderButton from "@/components/sidebarL/items/CalenderButton";
import UserButton from "@/components/sidebarL/items/UserButton";
import { parseCookies } from "nookies";
import React from "react";

const SidebarL = () => {
  return (
    <div className="h-screen flex flex-col justify-between items-center rounded w-20 bg-secondary-light pt-4 pb-4">
      <CalenderButton />
      <UserButton />
    </div>
  );
};

export default SidebarL;
