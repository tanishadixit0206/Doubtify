import React from "react";
import "./Sidebar.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar(){
    return <div className=" py-5 d-flex  justify-content-start flex-column sidebar text-center col-lg-2 col-2">
        <Navbar.Brand className='custom-navbar-text-side mx-5 py-3'>Subjects</Navbar.Brand>
        <Nav.Link className='custom-navbar-text1-side text-center py-3' href="#action1">All</Nav.Link>
        <Nav.Link className='custom-navbar-text1-side text-center py-3' href="#action1">Physics</Nav.Link>
        <Nav.Link className='custom-navbar-text1-side text-center py-3' href="#action1">Chemistry</Nav.Link>
        <Nav.Link className='custom-navbar-text1-side text-center py-3' href="#action1">Maths</Nav.Link>
        <Nav.Link className='custom-navbar-text1-side text-center py-3' href="#action1">Biology</Nav.Link>
    </div>
}

export default SideBar