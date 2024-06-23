"use client";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { logout } from "@/components/logout/action";

const UserButton = () => {
  const router = useRouter();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        as="div"
        className="rounded-full shadow-xl w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-tertiary-light hover:bg-tertiary-main cursor-pointer flex items-center justify-center"
      >
        <AccountCircleOutlinedIcon className="text-primary-main w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md focus:outline-none origin-top-right">
        <MenuItem
          as="div"
          className="bg-tertiary-light m-0.5 ml-1.5 p-1.5 rounded-md cursor-pointer"
          onClick={() => router.push("/user")}
        >
          <p>ユーザー情報</p>
        </MenuItem>
        <MenuItem
          as="div"
          className="bg-tertiary-light m-0.5 ml-1.5 p-1.5 rounded-md cursor-pointer"
          onClick={logout}
        >
          <p>ログアウト</p>
        </MenuItem>
        <MenuItem
          as="div"
          className="bg-tertiary-light m-0.5 ml-1.5 p-1.5 rounded-md cursor-pointer"
        >
          <p>今後のアップデート</p>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default UserButton;
