import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import TopBar from "./components/TopBar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyUserPage from "./pages/VerifyUserPage";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthContex";
import PrivateRoute from "./utils/PrivateRoutes";
const App = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-screen bg-white dark:bg-dark-background font-kaisei">
      <BrowserRouter>
        <AuthProvider>
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/verify" element={<VerifyUserPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
