import React from "react";
import { useAuth } from "../../Context/AuthContext";

const DashboardHome = ({ role }) => {
  const { currentUser } = useAuth();

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const dynamicGreeting = `${greeting}, ${currentUser.displayName}. 👋`;

  return (
    <>
      <div className="p-4 pt-20 min-h-screen lg:ml-64">
        <div
          className="bg-gradient-to-br from-sky-300 via-blue-400 to-blue-500 overflow-hidden p-4 md:p-6 rounded mb-8 relative bg-cover"
        >
          <div className="relative">
            <h1 className="text-slate-950 font-bold text-2xl md:text-3xl leading-snug mb-2">
              {dynamicGreeting}
            </h1>
            <p className="text-slate-800">
              Welcome to your dashboard. Scroll to see what's happening with
              your projects today:
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
