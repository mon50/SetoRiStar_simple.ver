import Calendar from "@/app/[userId]/calendar/components/Calendar";
import React from "react";

const page = () => {
  return (
    <div className="h-screen flex flex-grow">
      <Calendar />
    </div>
  );
};

export default page;
