import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/ui/Sidebar";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import { useAuth } from "../../Context/AuthContext";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { currentUser } = useAuth();
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  useEffect(() => {
    if (!currentUser) {
      navigate("/signup");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const nodeEnv = process.env.REACT_APP_NODE_ENV;
    const baseUrl =
      nodeEnv === "production"
        ? "Your Production Link of Backend"
        : "http://localhost:5000";
    const getUser = async () => {
      try {
        const response = await axios.get(
          baseUrl + "/api/users/getuser/" + currentUser?.uid,
          {
            withCredentials: true,
          }
        );
        if (!response.data.exists) {
          navigate("/role");
        } else {
          setRole(response.data.role);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (currentUser) {
      getUser();
    }
  }, [currentUser, navigate]);


  if (showLoading) {
    return <Loading />;
  }

  return (
    <>
      <Sidebar role={role} />
      <Routes>
        <Route
          path="/"
          element={<DashboardHome role={role}  />}
        />
      </Routes>
    </>
  );
};

export default Dashboard;
