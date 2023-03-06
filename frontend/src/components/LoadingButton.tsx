import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

interface ButtonProps {
  loading?: boolean;
  color?: string;
  text?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  text = " ",
  color = "bg-white-500",
  children,
  loading = false,
}) => {
  const buttonClasses = twMerge(
    `w-full py-3 font-semibold rounded-lg outline-none border-none flex justify-center`,
    `${color} ${loading && "bg-[#ccc]"}`
  );

  return (
    <button type="submit" className={buttonClasses}>
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-gray-500 inline-block">Loading...</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
      {children}
    </button>
  );
};
