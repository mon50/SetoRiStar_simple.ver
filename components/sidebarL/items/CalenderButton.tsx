"use client";
import React from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { IconButton } from "@mui/material";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";

const CalenderButton = () => {
  const router = useRouter();

  function getCookies() {
    const cookies = parseCookies();
    console.log({ cookies });
    return cookies;
  }

  function JumpCalendar() {
    const cookies = getCookies();
    return cookies.userId + "/calendar";
  }
  return (
    <IconButton
      className="rounded-full shadow-xl w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-tertiary-light hover:bg-tertiary-main"
      onClick={() => router.push(JumpCalendar())}
    >
      <CalendarMonthOutlinedIcon className="text-primary-main w-full h-full" />
    </IconButton>
  );
};

export default CalenderButton;
