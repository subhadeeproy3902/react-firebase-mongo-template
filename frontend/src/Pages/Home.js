import React from "react";
import { useAuth } from "../Context/AuthContext";
import HeroSection from "../Components/Sections/HeroSection";


const Home = () => {
  const { currentUser } = useAuth();
  const page = currentUser ? "/dashboard" : "/signup";

  return (
    <>
      <HeroSection page={page} />
    </>
  );
};

export default Home;
