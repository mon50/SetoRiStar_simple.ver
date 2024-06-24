// hooks/useUserAttendLiveInfo.ts
import { useState, useEffect, useCallback } from "react";
import { LiveData } from "@/types/ArtistType";
import { getAttendLiveInfo } from "@/utils/actions/getAttendLiveIds";
import { getLiveInfo } from "@/utils/actions/getLiveInfo";

export const useUserAttendLiveInfo = (userId: string) => {
  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserLive = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const { data: liveIdsData, error: liveIdsError } =
        await getAttendLiveInfo(userId);

      if (liveIdsError) {
        throw new Error("Error fetching live IDs");
      }

      const { data: liveData, error: liveDataError } = await getLiveInfo(
        liveIdsData
      );

      if (liveDataError) {
        throw new Error("Error fetching live data");
      }

      setLiveData(liveData || []);
    } catch (error) {
      console.error("Error loading user data:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getUserLive();
  }, [getUserLive]);

  return { liveData, loading, error, refetch: getUserLive };
};
