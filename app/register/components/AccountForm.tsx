"use client";
import Birthday from "@/app/register/components/Birthday";
import Email from "@/app/register/components/Email";
import Icon from "@/app/register/components/Icon";
import Password from "@/app/register/components/Password";
import RegisterButton from "@/app/register/components/RegisterButton";
import RegisterHeader from "@/app/register/components/RegisterHeader";
import UserName from "@/app/register/components/UserName";
import { AccountType } from "@/types/AccountType";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function AccountForm() {
  const supabase = createClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountType>();

  return (
    <div className="border border-primary-dark rounded-md p-6 w-2/3 shadow-xl max-md:mx-auto">
      <form
        className="space-y-6"
        // onSubmit={}
        method="POST"
      >
        <RegisterHeader />
        <UserName register={register} error={errors.username?.message} />
        <Email register={register} error={errors.email?.message} />
        <Icon register={register} error={errors.icon?.message} />
        <Birthday register={register} error={errors.birthday?.message} />
        <Password register={register} error={errors.password?.message} />

        <RegisterButton />
        <p className="text-sm !mt-10 text-center text-primary-dark">
          Have an account{" "}
          <button
            type="button"
            onClick={() => {
              router.push("/login");
            }}
            className="text-primary-light hover:underline ml-1 whitespace-nowrap"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
