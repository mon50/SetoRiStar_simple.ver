"use client";
import React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

const AddLiveButton = () => {
  const router = useRouter();
  const cookies = parseCookies();

  return (
    <IconButton
      className="rounded-full shadow-xl w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-tertiary-light hover:bg-tertiary-main"
      onClick={() => router.push(`/add?userId=${cookies.userId}`)}
    >
      <PostAddIcon className="text-primary-main w-full h-full" />
    </IconButton>
  );
};

export default AddLiveButton;
