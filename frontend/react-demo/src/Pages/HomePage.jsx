import React from "react";
import NavBar from "../components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from "../components/Sidebar";

function Home() {
    return (
        <div>
            <NavBar />
            <SideBar />
        </div>
    )
}

export default Home