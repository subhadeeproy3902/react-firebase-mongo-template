import React from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ page }) => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Link
          to={page}
          className="relative rounded-lg text-black text-sm flex items-center gap-1.5 py-2 px-5 mx-3 bg-gradient-to-bl from-blue-400 to-sky-400 font-medium tracking-wide hover:bg-gradient-to-tr duration-200 transition-all ease-in-out"
          disabled={true}
        >
          To {page === "/dashboard" ? "Dashboard" : "Sign Up"}
        </Link>
      </div>
    </>
  );
};

export default HeroSection;
