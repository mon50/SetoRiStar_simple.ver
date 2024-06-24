import { createClient } from "@/utils/supabase/server";

export default async function GetUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  return user;
}
