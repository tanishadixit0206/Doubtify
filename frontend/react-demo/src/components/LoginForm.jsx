import React, { useState } from "react";
import "./Form.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from "axios"
import { useNavigate ,Link,useEffect} from "react-router-dom";
import { useAuthContext } from "../hooks/UseAuthContext";


function LoginForm() {
    const {dispatch} = useAuthContext()
    let navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [error,setError] = useState("")

    async function handleSubmit(event) {
        event.preventDefault(); 
    
        const {email, password} = user;
    
        if (!email || !password) {
          setError("Please fill in all fields.");
          return;
        }
    
        try {
          const response = await axios.post("http://localhost:5000/login", user);// Assuming successful response has data
    
          if (response.data.auth) {
            localStorage.setItem("token",response.data.token)
            dispatch({type:'LOGIN',payload:response.data})
            // Handle successful registration (e.g., navigate to login page, show success message)
            navigate("/home");
          } else {
            setError("Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error logging in user:", error);
          setError("Login failed. Please try again.");
        }
      }

    const [hover1, setHover1] = useState(false);

    function ishover1() {
        setHover1(true);
    }
    function isnothover1() {
        setHover1(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prevValue) => {
            if (name === "email") {
                return {
                    email: value,
                    password: prevValue.password
                }
            }
            else if (name === "password") {
                return {
                    email: prevValue.email,
                    password: value
                }
            }
        })
    }
    return <div className="container d-flex flex-column justify-content-center align-items-center">
        <h3 className="login-h3">
            Welcome to
        </h3>
        <h1 className="login-h1">Doubtify</h1>
        <form action="/home" className="login-form d-flex flex-column justify-content-center align-items-center">

            <input required autoComplete="off" className="login-input d-block my-3 p-2"
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
            />
            <input required autoComplete="off" type="password" name="password" className="login-input d-block my-3 p-2"
                placeholder="Password" onChange={handleChange} value={user.password} />
            <Button style={!hover1 ? {
                color: "white",
                backgroundColor: "rgb(113, 44, 249)",
                borderColor: "rgb(113, 44, 249)",
                fontFamily: "Poppins",
                fontWeight: "700",
                fontStyle: "normal",
                fontSize: "1.1rem"
            } : {
                color: "rgb(113, 44, 249)",
                backgroundColor: "white",
                borderColor: "rgb(113, 44, 249)",
                fontFamily: "Poppins",
                fontWeight: "700",
                fontStyle: "normal",
                fontSize: "1.1rem"
            }} type="submit" onClick={handleSubmit} onMouseEnter={ishover1} onMouseLeave={isnothover1} className='login-btn d-block px-5 my-3 py-2' variant="primary">Login</Button>

        </form>
    </div>
}

export default LoginForm