import { createClient } from "@/utils/supabase/server";

export default async function UserPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <p>UserPage</p>
    </>
  );
}
