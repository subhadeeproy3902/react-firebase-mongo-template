import React from "react";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Role from "./Pages/Role";

function App() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full">
        <AuthProvider>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/role" element={<Role />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
