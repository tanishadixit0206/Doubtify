import React from "react";
import LoginForm from "../components/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage(){
  return(  <div className="d-flex justify-content-center align-items-center text-center min-vh-100">
      <div className="strpage-box"> 
        <LoginForm/>
      </div>
    </div>
)
}

export default LoginPage