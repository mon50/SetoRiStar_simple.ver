import React from "react";
import { UseFormRegister } from "react-hook-form";
import { AccountType } from "@/types/AccountType";

interface PasswordProps {
  register: UseFormRegister<AccountType>;
  error?: string;
}

const Password: React.FC<PasswordProps> = ({ register, error }) => {
  return (
    <div>
      <label
        className="text-sm mb-2 block text-primary-dark"
        htmlFor="password"
      >
        Password
      </label>
      <div className="relative flex items-center">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
          id="password"
          name="password"
          type="password"
          className={`w-full text-sm border shadow-inner ${
            error ? "border-red-500" : "border-gray-300"
          } px-4 py-3 rounded-md outline-primary-dark`}
          placeholder="Enter password"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Password;
