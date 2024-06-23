//[userid]/page.tsx
import UserForm from "@/app/[userId]/components/UserForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
    return null;
  }
  console.log("user", user);

  return <UserForm authId={user.id} />;
}
