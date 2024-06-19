import { AccountType } from "@/types/AccountType";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface BirthdayProps {
  register: UseFormRegister<AccountType>;
  error?: string;
}

const Birthday: React.FC<BirthdayProps> = ({ register, error }) => {
  return (
    <div>
      <label
        className="text-sm mb-2 block text-primary-dark"
        htmlFor="Birthday"
      >
        Birthday
      </label>
      <div className="relative flex items-center">
        <input
          {...register("birthday", {
            required: "Birthday is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid Birthday",
            },
          })}
          id="birthday"
          name="birthday"
          type="date"
          className={`w-full text-sm border shadow-inner ${
            error ? "border-red-500" : "border-gray-300"
          } px-4 py-3 rounded-md outline-primary-dark`}
          placeholder="Enter Birthday"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Birthday;
