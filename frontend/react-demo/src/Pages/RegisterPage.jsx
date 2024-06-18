import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from "../components/RegisterForm";

function RegisterPage(){
  return(  <div className="d-flex justify-content-center align-items-center text-center min-vh-100">
      <div className="strpage-box"> 
        <RegisterForm/>
      </div>
    </div>
)
}

export default RegisterPage