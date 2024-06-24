import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";

export const getAttendLiveInfo = async (
  userId: string
): Promise<{
  data: { live_id: any }[] | null;
  error: PostgrestError | null;
}> => {
  const supabase = createClient();
  const { data: liveIdsData, error: liveIdsError } = await supabase
    .from("user_live_schedules")
    .select("live_id")
    .eq("user_id", userId);

  return { data: liveIdsData, error: liveIdsError };
};
