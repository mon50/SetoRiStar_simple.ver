"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginType } from "@/types/LoginType";
import LoginButton from "@/app/login/components/LoginButton";
import Password from "@/app/login/components/Password";
import Email from "@/app/login/components/Email";
import LoginHeader from "@/app/login/components/LoginHeader";
import RememberMe from "@/app/login/components/RememberMe";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/app/login/action";

const LoginForm = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setLoginError(null); // Clear previous errors
    const response = await login(data);
    if (response?.error) {
      setLoginError(response.error);
      console.error("Login failed", response.error);
    } else {
      console.log("Form submitted", data);
    }
  };

  return (
    <div className="border border-primary-dark rounded-md p-6 w-2/3 shadow-xl max-md:mx-auto">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <LoginHeader />
        <Email register={register} error={errors.email?.message} />
        <Password register={register} error={errors.password?.message} />
        <div className="flex items-center justify-between gap-2">
          <RememberMe />
          <div className="text-sm">
            <a
              href="javascript:void(0);"
              className="text-primary-main hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </div>
        <LoginButton />
        {loginError && (
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        )}
        <p className="text-sm !mt-10 text-center text-primary-dark">
          Don't have an account{" "}
          <button
            type="button"
            onClick={() => {
              router.push("/register");
            }}
            className="text-primary-light hover:underline ml-1 whitespace-nowrap"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
