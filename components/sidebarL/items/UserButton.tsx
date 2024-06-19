"use client";
import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { logout } from "@/components/logout/action";

const UserButton = () => {
  const router = useRouter();
  return (
    <Menu as="div" className="relative">
      <MenuButton
        as="div"
        className="rounded-full shadow-xl w-16 h-16 bg-tertiary-light hover:bg-tertiary-main cursor-pointer flex items-center justify-center"
      >
        <AccountCircleOutlinedIcon className="text-primary-main w-full h-full" />
      </MenuButton>
      <MenuItems
        anchor="right"
        className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md focus:outline-none"
      >
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
