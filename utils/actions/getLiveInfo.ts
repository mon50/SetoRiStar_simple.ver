"use client";
import { LiveData } from "@/types/ArtistType";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

export const getLiveInfo = async (
  liveIdsData: { live_id: string }[] | null
): Promise<{
  data: LiveData[] | null;
  error: PostgrestError | null;
}> => {
  if (!liveIdsData || liveIdsData.length === 0) {
    return { data: null, error: null };
  }
  const liveIds = liveIdsData?.map((item) => item.live_id);
  const supabase = createClient();
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

  return { data: liveData, error: liveDataError };
};
