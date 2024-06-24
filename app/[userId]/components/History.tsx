// components/History.tsx
"use client";
import HistoryCard from "@/app/[userId]/components/HistoryCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import React from "react";
import { useUserAttendLiveInfo } from "@/hooks/useUserAttendLiveInfo";

const History = ({ userId }: { userId: string }) => {
  const { liveData, loading, error } = useUserAttendLiveInfo(userId);

  if (loading) {
    return <p className="text-center py-4">読み込み中...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-4 text-red-500">
        エラーが発生しました: {error}
      </p>
    );
  }

  return (
    <>
      {liveData.length > 0 ? (
        <div>
          <div className="flex justify-end mr-6">
            <IconButton>
              <AddCircleOutlineIcon className="text-primary-light" />
            </IconButton>
          </div>
          <div>
            {liveData.map((livedata) => (
              <HistoryCard
                key={livedata.live_id}
                livedata={livedata}
                userId={userId}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">No live schedule</div>
      )}
    </>
  );
};

export default History;
