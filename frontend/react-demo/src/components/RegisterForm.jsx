import React, { useState } from "react";
import { useNavigate ,Link,useEffect} from "react-router-dom";
import "./Form.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from "axios"

function RegisterForm() {
    let navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
        repassword:"",
        username:""
    })

    const [error, setError] = useState(null); // To store error messages

    async function handleSubmit(event) {
      event.preventDefault();
      console.log(user) // Prevent default form submission
  
      const { email, password, repassword, username } = user;
  
      // Basic client-side validation (optional; consider a validation library)
      if (!email || !password || !repassword || !username) {
        setError("Please fill in all fields.");
        return;
      }
  
      if (password !== repassword) {
        setError("Passwords do not match.");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:5000/register", user);
        console.log(response.data); // Assuming successful response has data
  
        if (response.data.message === "User created successfully") {
          // Handle successful registration (e.g., navigate to login page, show success message)
          navigate("/login");
        } else {
          // Handle unexpected response
          setError("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setError("Registration failed. Please try again.");
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
                    password: prevValue.password,
                    repassword:prevValue.repassword,
                    username:prevValue.username
                }
            }
            else if (name === "password") {
                return {
                    email: prevValue.email,
                    password: value,
                    repassword:prevValue.repassword,
                    username:prevValue.username
                }
            }
            else if (name === "repassword") {
                return {
                    email: prevValue.email,
                    password: prevValue.password,
                    repassword:value,
                    username:prevValue.username
                }
            }
            else if (name === "username") {
                return {
                    email: prevValue.email,
                    password: prevValue.password,
                    repassword:prevValue.repassword,
                    username:value
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
            <input required autoComplete="off" className="login-input d-block my-3 p-2"
                onChange={handleChange}
                pattern=".{8,}"
                type="password"
                name="password"
                placeholder="Password (8 or more)"
                value={user.password}
            />
            <input required autoComplete="off" className="login-input d-block my-3 p-2"
                onChange={handleChange}
                pattern=".{8,}"
                type="password"
                name="repassword"
                placeholder="Confirm Password"
                value={user.repassword}
            />
            <input required autoComplete="off" type="text" name="username" className="login-input d-block my-3 p-2"
                placeholder="What should we call you" onChange={handleChange} value={user.username} />
            <Button style={!hover1?{
              color: "white",
              backgroundColor: "rgb(113, 44, 249)",
              borderColor: "rgb(113, 44, 249)",
              fontFamily: "Poppins",
              fontWeight: "700",
              fontStyle: "normal",
              fontSize: "1.1rem"
            }:{
                color: "rgb(113, 44, 249)",
                backgroundColor: "white",
                borderColor: "rgb(113, 44, 249)",
                fontFamily: "Poppins",
                fontWeight: "700",
                fontStyle: "normal",
                fontSize: "1.1rem"
              }} type="submit" onClick={handleSubmit} onMouseEnter={ishover1} onMouseLeave={isnothover1} className='login-btn d-block px-5 my-3 py-2' variant="primary">Register</Button>

        </form>
    </div>
}

export default RegisterForm