import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./Pages/ProfilePage";
import Header from "./Layout/Header";
import VerifyCode from './Pages/VerifyCode';

import "./App.css";

const requestBody = {};

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setAuthenticated(true);
      setUserInfo(JSON.parse(storedUser));
    } else {
      setAuthenticated(false);
      setUserInfo(null);
    }
  }, [authenticated]);

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
  };

  const handleSuccess = (successMessage) => {
    setOpen(true);
    setMessage(successMessage);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3000/api/user/logout", requestBody, { headers })
      .then(() => {
        sessionStorage.removeItem("user");
        setAuthenticated(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleRegister = async (formData) => {
    formData["name"] = `${formData.firstName} ${formData.lastName}`;
    try {
      const response = await axios.post("http://localhost:3000/api/user", formData,{ withCredentials: true });
      console.log(response)
      console.log("Registration successful:", response.data);
      return true;
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      return false;
    }
  };

  return (
    <>
      <Header
        onLogout={handleLogout}
        setAuthenticated={setAuthenticated}
        authenticated={authenticated}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              setAuthenticated={setAuthenticated}
              setAuthToken={setAuthToken}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              setAuthenticated={setAuthenticated}
              setAuthToken={setAuthToken}
              onRegister={handleRegister}
            />
          }
        />
        <Route path="/verify" element={<VerifyCode />} />
        <Route
          path="/profile"
          element={
            <ProfilePage userInfo={userInfo} displaySuccess={handleSuccess} />
          }
        />
      </Routes>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;