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
      className="rounded-full shadow-xl w-16 h-16 bg-tertiary-light hover:bg-tertiary-main"
      onClick={() => router.push(JumpCalendar())}
    >
      <CalendarMonthOutlinedIcon className="text-primary-main w-full h-full" />
    </IconButton>
  );
};

export default CalenderButton;
