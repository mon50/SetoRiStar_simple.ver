"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteUserLive(userId: string, liveId: string) {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("user_live_schedules")
      .delete()
      .match({ user_id: userId, live_id: liveId });

    if (error) {
      console.error("Error removing schedule:", error);
      return { success: false, error: error.message };
    } else {
      revalidatePath("/"); // リロードの代わりにキャッシュを再検証
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting live:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
