import Calendar from "@/app/[userId]/calendar/components/Calendar";
import React from "react";

const page = () => {
  return (
    <div className="flex-grow overflow-auto p-4 sm:p-6 md:p-8">
      <Calendar />
    </div>
  );
};

export default page;
