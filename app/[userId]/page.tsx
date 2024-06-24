//[userid]/page.tsx
import UserForm from "@/app/[userId]/components/UserForm";
import GetUser from "@/utils/actions/getUser";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const user = await GetUser();

  if (!user) {
    redirect("/login");
    return null;
  }
  console.log("user", user);

  return <UserForm authId={user.id} />;
}
