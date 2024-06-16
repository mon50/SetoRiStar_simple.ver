"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const { error } = await supabase.auth.signInWithPassword(data);
  } catch (error) {
    redirect("/error");
  }
  //TODO: storeのsignIn Stateがtrueなことを確認したらmainにリダイレクト
  //TODO: ユーザー情報が登録されていない場合は、入力されたemailとpasswordを元にユーザー情報を登録するsignup関数を実行し、accountにリダイレクト
  revalidatePath("/", "layout");
  redirect("/main");
  console.log("login Passed");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  console.log(data);

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
