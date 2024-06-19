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
      className="flex flex-grow justify-between m-4 bg-secondary-main border border-tertiary-main rounded-md shadow-xl p-4"
    >
      <div className="flex">
        <DateDisplay dateStr={livedata.date.toString()} />
        <div className="pl-6">
          {" "}
          <h1 className="text-2xl font-bold">{livedata.live_title}</h1>
          {/* <p>{livedata.artists.map((artist))}</p> */}
          <p>{livedata.venue}</p>
          <p>{livedata.capacity ? livedata.capacity : "-"}</p>
        </div>
      </div>
      {isBeforeYesterday(livedata.date) ? (
        <IconButton className="w-1/9 rounded h-full bg-secondary-main rounded-lg flex justify-center align-center p-6 border shadow-inner">
          <ChatIcon className="text-primary-light" />
        </IconButton>
      ) : (
        <IconButton className="w-1/9 rounded h-1/3 bg-secondary-main rounded-lg flex justify-start align-center p-2 border shadow-inner">
          <ClearIcon className="text-red-500" />
        </IconButton>
      )}
    </div>
  );
};

export default HistoryCard;
