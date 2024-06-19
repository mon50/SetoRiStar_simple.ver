import React from "react";

const RememberMe = () => {
  return (
    <div className="flex items-center">
      <input
        id="remember-me"
        name="remember-me"
        type="checkbox"
        className="h-4 w-4 shrink-0 text-primary-main focus:ring-primary-dark border-tertiary-main rounded"
      />
      <label
        htmlFor="remember-me"
        className="ml-3 block text-sm text-primary-dark"
      >
        Remember me
      </label>
    </div>
  );
};

export default RememberMe;
