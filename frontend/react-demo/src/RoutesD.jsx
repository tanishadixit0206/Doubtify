import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Home from "./Pages/HomePage";
import StartPage from "./Pages/Startpage";
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import { useAuthContext } from "./hooks/UseAuthContext";

function RoutesD() {
  const { user } = useAuthContext()
  return (
    <Router>
      <Routes>
        <Route element={<StartPage />} exact path="/"></Route>
        <Route element={user ? <Home /> : <Navigate to="/login"/>} path="/home"> </Route>
        <Route element={!user ? <LoginPage /> : <Navigate to="/home"/>} exact path="/login"></Route>
        <Route element={!user ? <RegisterPage />: <Navigate to="/home"/>} path="/register"> </Route>
        </Routes>
    </Router>

  );
}

export default RoutesD;
