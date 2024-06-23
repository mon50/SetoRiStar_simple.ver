import React from "react";
import StarIcon from "@mui/icons-material/Star";

const Header = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center bg-primary-main rounded-md">
      <button className="flex flex-col sm:flex-row items-center">
        <div className="flex items-center">
          <h1 className="text-tertiary-main font-bold text-xl">SetoRiStar</h1>
          <StarIcon className="text-secondary-light" />
        </div>
        <div className="mt-1 sm:mt-0 sm:ml-2">
          <p className="rounded-md bg-red-500 text-tertiary-main font-bold p-0.5 text-xs">
            SimpleVer
          </p>
        </div>
      </button>
      <div className=""></div>
    </div>
  );
};

export default Header;
