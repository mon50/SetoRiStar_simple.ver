import React from "react";
import DateDisplay from "@/app/[userId]/components/DateDisplay";
import { LiveData } from "@/types/ArtistType";
import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { DeleteButton } from "@/components/common/DeleteButton";

const HistoryCard = ({
  livedata,
  userId,
}: {
  livedata: LiveData;
  userId?: string;
}) => {
  const isBeforeOrEqualToYesterday = (dateStr: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
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
        <div className="pl-6">
          <h1 className="text-2xl font-bold">{livedata.live_title}</h1>
          <p>{livedata.venue}</p>
          <p>{livedata.capacity ? livedata.capacity : "-"}</p>
        </div>
      </div>
      {isBeforeOrEqualToYesterday(livedata.date) ? (
        <IconButton className="w-1/9 rounded h-full bg-secondary-main rounded-lg flex justify-center align-center p-6 border shadow-inner">
          <ChatIcon className="text-primary-light" />
        </IconButton>
      ) : userId ? (
        <DeleteButton userId={userId} liveId={livedata.live_id} />
      ) : (
        <IconButton disabled>
          <ChatIcon className="text-gray-400" />
        </IconButton>
      )}
    </div>
  );
};

export default HistoryCard;
