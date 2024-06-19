import React from "react";
import { UseFormRegister } from "react-hook-form";
import { LoginType } from "@/types/LoginType";

interface EmailProps {
  register: UseFormRegister<LoginType>;
  error?: string;
}

const Email: React.FC<EmailProps> = ({ register, error }) => {
  return (
    <div>
      <label className="text-sm mb-2 block text-primary-dark" htmlFor="email">
        Email
      </label>
      <div className="relative flex items-center">
        <input
          {...register("email", {
            required: "メールアドレスは入力必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "正しい形式で入力してください",
            },
            maxLength: {
              value: 255,
              message: "メールアドレスは255文字以内で入力してください",
            },
          })}
          id="email"
          name="email"
          type="email"
          className={`w-full text-sm border shadow-inner ${
            error ? "border-red-500" : "border-gray-300"
          } px-4 py-3 rounded-md outline-primary-dark`}
          placeholder="Enter email address"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Email;
