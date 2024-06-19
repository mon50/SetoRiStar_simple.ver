// DateDisplay.tsx
import React from "react";

const DateDisplay = ({ dateStr }: { dateStr: string }) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-16 h-16 bg-tertiary-main rounded-lg flex flex-col items-center justify-center divide-y divide-secondary-main shadow-md">
        <div className="text-lg font-bold pr-6">{month}</div>
        <div className="text-lg font-bold pl-6">{day}</div>
      </div>
      <div className="text-md font-bold mt-6">{year}</div>
    </div>
  );
};

export default DateDisplay;
