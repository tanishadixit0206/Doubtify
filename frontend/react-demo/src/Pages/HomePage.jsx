import React from "react";
import NavBar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "../components/Sidebar";
import { useAuthContext } from "../hooks/UseAuthContext";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { SubjectProvider } from "../context/SubjectContext";
function Home() {
    const user = useAuthContext()
    return (
        <SubjectProvider>
        <div>
            <NavBar  />
            <SideBar />
            <Fab size="large" style={{backgroundColor:"rgb(113,44,249)",color:"white",position:"fixed",bottom:"4vh",right:"2vw"}}>
                <AddIcon/>
            </Fab>
        </div>
        </SubjectProvider>
    )
}

export default Home