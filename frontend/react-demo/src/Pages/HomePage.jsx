import React from "react";
import NavBar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "../components/Sidebar";
import { useAuthContext } from "../hooks/UseAuthContext";
function Home() {
    const user = useAuthContext()
    return (
        <div>
            <NavBar />
            <SideBar />
        </div>
    )
}

export default Home