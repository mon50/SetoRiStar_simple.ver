import React from "react";

interface CustomButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  text: string;
  formAction?: any;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<CustomButtonProps> = ({
  type,
  onClick,
  text,
  formAction,
  disabled = false,
  className,
}) => {
  return (
    <div className="!mt-10">
      <button
        type={type}
        onClick={onClick}
        formAction={formAction}
        disabled={disabled}
        className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-tertiary-light bg-primary-main hover:bg-primary-dark focus:outline-none ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className || ""}`}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
