//app/login/action.ts
"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LoginType } from "@/types/LoginType";

export async function login(data: LoginType) {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    return { error: "メールアドレスかパスワードが違います。" };
  }

  const userId = authData.user?.id;

  console.log("login Passed");

  revalidatePath("/", "layout");
  redirect(`/${userId}`);
  return null;
}

//FIXME: ここから下は未実装
// export async function signup(formData: FormData) {
//   const supabase = createClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   console.log(data);

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/account");
// }
