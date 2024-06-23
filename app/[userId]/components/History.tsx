"use client";
import HistoryCard from "@/app/[userId]/components/HistoryCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { LiveData } from "@/types/ArtistType";
import { createClient } from "@/utils/supabase/client";
import React, { useCallback, useEffect, useState } from "react";
import { IconButton } from "@mui/material";

const History = ({ userId }: { userId: string }) => {
  const [liveData, setLiveData] = useState<LiveData[]>([]);

  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const getUserLive = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const { data: liveIdsData, error: liveIdsError } = await supabase
        .from("user_live_schedules")
        .select("live_id")
        .eq("user_id", userId);

      if (liveIdsError) {
        console.error("Error fetching live IDs:", liveIdsError);
        return [];
      }

      const liveIds = liveIdsData.map((item) => item.live_id);

      const { data: liveData, error: liveDataError } = await supabase
        .from("lives")
        .select(
          `
                *,
                artists (
                    artist_name
                )
            `
        )
        .in("live_id", liveIds)
        .order("date", { ascending: false });

      if (liveDataError) {
        console.error("Error fetching live data:", liveDataError);
        return [];
      }
      setLiveData(liveData);
      console.log(liveData);
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    getUserLive();
    console.log(userId);
  }, [userId, getUserLive]);

  if (loading) {
    return <p className="text-center py-4">読み込み中...</p>;
  }

  return (
    <div className="mt-4 sm:mt-6">
      {liveData.length > 0 ? (
        <div>
          <div className="flex justify-end mb-2 sm:mb-4">
            <IconButton>
              <AddCircleOutlineIcon className="text-primary-light" />
            </IconButton>
          </div>
          <div className="grid gap-4 sm:gap-6">
            {liveData.map((livedata) => (
              <HistoryCard key={livedata.live_id} livedata={livedata} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-4">No live schedule</div>
      )}
    </div>
  );
};

export default History;
