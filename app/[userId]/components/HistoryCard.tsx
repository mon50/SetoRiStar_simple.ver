import DateDisplay from "@/app/[userId]/components/DateDisplay";
import AddScheduleButton from "@/components/common/addSchedule.button";
import { LiveData } from "@/types/ArtistType";
import { IconButton } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import ChatIcon from "@mui/icons-material/Chat";

const HistoryCard = ({ livedata }: { livedata: LiveData }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const isBeforeYesterday = (dateStr: Date) => {
    const date = new Date(dateStr);
    return date <= yesterday;
  };

  return (
    <div
      key={livedata.live_id}
      className="flex flex-col sm:flex-row justify-between bg-secondary-main border border-tertiary-main rounded-md shadow-xl p-4"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-0">
        <DateDisplay dateStr={livedata.date.toString()} />
        <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">
            {livedata.live_title}
          </h1>
          <p className="mt-2">{livedata.venue}</p>
          <p>{livedata.capacity ? livedata.capacity : "-"}</p>
        </div>
      </div>
      <div className="flex justify-center sm:justify-end mt-4 sm:mt-0">
        {isBeforeYesterday(livedata.date) ? (
          <IconButton className="bg-secondary-main rounded-lg flex justify-center items-center p-2 sm:p-4 border shadow-inner">
            <ChatIcon className="text-primary-light" />
          </IconButton>
        ) : (
          <IconButton className="bg-secondary-main rounded-lg flex justify-center items-center p-2 sm:p-4 border shadow-inner">
            <ClearIcon className="text-red-500" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
