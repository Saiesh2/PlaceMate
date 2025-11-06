import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { Toaster } from "react-hot-toast";
import UserPage from "./pages/UserPage.jsx";
import  {useAuthStore}  from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import Navbar from "./Components/Navbar.jsx";
import Goals from "./pages/Goals.jsx";
import PlacementsPage from "./pages/PlacementsPage.jsx";
import InterviewsPage from "./pages/InterviewsPage.jsx";
import GoalsDemo from "./pages/GoalsDemo.jsx";
import VideoCall from "./pages/VideoCall.jsx";
import ResumeDemo from './pages/ResumeDemo';
import CommunityPage from "./pages/CommunityPage.jsx";
import Resume from "./pages/Resume.jsx";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      navigate("/user");
    }
  }, [authUser]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
      <div className="min-h-screen">{/* Ensures theme is applied to full page */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/goalsdemo" element={<GoalsDemo />} />
          <Route path="/resume-demo" element={<ResumeDemo />} />
          {/* Protected Routes for Clients */}
          {authUser && (
            <>
              <Route path="/user" element={<UserPage />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/videocall" element={<VideoCall />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/resume" element={<Resume />} />
            </>
          )}
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
