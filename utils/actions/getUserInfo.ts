//authidからユーザー情報を取得する
"use client";
import { createClient } from "@/utils/supabase/client";

export const getUserInfo = async (authId: string) => {
  const supabase = createClient();
  const { data, error, status } = await supabase
    .from("users")
    .select(`user_id,display_name, display_image,email`)
    .eq("auth_id", authId)
    .single();
  return { data, error, status };
};
