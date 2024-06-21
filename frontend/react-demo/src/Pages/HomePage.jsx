import React, { useState } from "react";
import NavBar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "../components/Sidebar";
import { useAuthContext } from "../hooks/UseAuthContext";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { SubjectProvider } from "../context/SubjectContext";
import AddSolutionDiv from "../components/AddSolutionDiv";
import CloseIcon from '@mui/icons-material/Close';


function Home() {

    const [isClicked,setIsClicked] = useState(true)
    function handleClick(){
        setIsClicked(!isClicked)
    }
    return (
        <SubjectProvider>
        <div>
            <NavBar  />
            <SideBar />
            
            <Fab onClick={handleClick} size="large" style={{backgroundColor:"rgb(113,44,249)",color:"white",position:"fixed",bottom:"4vh",right:"2vw",zIndex:"1000"}}>
               {isClicked ? <AddIcon/>:<CloseIcon/> } 
            </Fab>
            {
                !isClicked ? <AddSolutionDiv submit_function = {handleClick} />:null
            }
        </div>
        </SubjectProvider>
    )
}

export default Home