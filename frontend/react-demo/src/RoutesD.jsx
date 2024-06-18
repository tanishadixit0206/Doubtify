import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import StartPage from "./Pages/Startpage";
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import { AuthContextProvider } from "./context/AuthContext";
function RoutesD() {
  return (
    <Router>
      <AuthContextProvider>
      <Routes>
        
        <Route element={<StartPage />} exact path="/"></Route>
        <Route element={<Home />} path="/home"> </Route>
        <Route element={<LoginPage />} exact path="/login"></Route>
        <Route element={<RegisterPage />} path="/register"> </Route>
      
        </Routes>
        </AuthContextProvider>
    </Router>
  );
}

export default RoutesD;
