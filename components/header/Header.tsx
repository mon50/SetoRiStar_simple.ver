import React from "react";
import StarIcon from "@mui/icons-material/Star";

const Header = () => {
  return (
    <div className="w-full p-4 flex justify-between bg-primary-main rounded-md">
      <button className="">
        <div className="flex flex-row">
          <h1 className="text-tertiary-main font-bold text-xl">SetoRiStar</h1>
          <StarIcon className="text-secondary-light" />
        </div>
        <div className="flex justify-end">
          <p className=" rounded-md bg-red-500 text-tertiary-main font-bold p-0.5 text-xs">
            SimpleVer
          </p>
        </div>
      </button>
      <div className=""></div>
    </div>
  );
};

export default Header;
