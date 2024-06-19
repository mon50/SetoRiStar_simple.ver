import { AccountType } from "@/types/AccountType";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface IconProps {
  register: UseFormRegister<AccountType>;
  error?: string;
}

const Icon: React.FC<IconProps> = ({ register, error }) => {
  return (
    <div>
      <label className="text-sm mb-2 block text-primary-dark" htmlFor="Icon">
        Icon
      </label>
      <div className="relative flex items-center">
        <input
          {...register("icon", {
            required: "Icon is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid Icon",
            },
          })}
          id="icon"
          name="icon"
          type="url"
          className={`w-full text-sm border shadow-inner ${
            error ? "border-red-500" : "border-gray-300"
          } px-4 py-3 rounded-md outline-primary-dark`}
          placeholder="Enter Icon"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Icon;
