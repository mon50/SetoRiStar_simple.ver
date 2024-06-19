import { AccountType } from "@/types/AccountType";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface UserNameProps {
  register: UseFormRegister<AccountType>;
  error?: string;
}

const UserName: React.FC<UserNameProps> = ({ register, error }) => {
  return (
    <div>
      <label
        className="text-sm mb-2 block text-primary-dark"
        htmlFor="username"
      >
        UserName
      </label>
      <div className="relative flex items-center">
        <input
          {...register("username", {
            required: "username is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid username",
            },
          })}
          id="username"
          name="username"
          type="text"
          className={`w-full text-sm border shadow-inner ${
            error ? "border-red-500" : "border-gray-300"
          } px-4 py-3 rounded-md outline-primary-dark`}
          placeholder="Enter username"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default UserName;
