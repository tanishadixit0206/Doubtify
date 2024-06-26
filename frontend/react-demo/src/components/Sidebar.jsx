import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SubjectContext } from "../context/SubjectContext";
import axios from "axios";
import { useAuthContext } from "../hooks/UseAuthContext";



function SideBar(props) {
    const { user } = useAuthContext()
    const [isSelected, setIsSelected] = useState("All")
    const { subject, selectSubject } = useContext(SubjectContext)
    const [doubts, setDoubts] = useState([])


    const selectSubjectinNavbar = async (event) => {
        const newSubject = event.target.textContent;
        selectSubject(newSubject);
        setIsSelected(event.target.textContent)}
        useEffect(()=>{
            const getDoubts = async()=>{
                const response = await axios.post("http://localhost:5000/home/filter_side", {
                    subject: subject,
                }, {
                    headers: {
                        'Authorization': `Bearer ${user}`,
                    }
                });
                console.log(response)
                setDoubts(response.data);
                props.searchFunction(response.data); 
            }
            getDoubts()
        },[isSelected])

    return <div style={{ zIndex: "2000", position: "fixed", top: "9vh", left: "0" }} className=" py-5 d-flex  justify-content-start flex-column sidebar text-center col-lg-2 col-2">
        <Navbar.Brand className='custom-navbar-text-side mx-5 py-3'>Subjects</Navbar.Brand>
        <Nav.Link style={isSelected === "All" ? { color: "white", backgroundColor: "rgb(170, 127, 255)" } : null} onClick={selectSubjectinNavbar} id="1" className='custom-navbar-text1-side text-center py-3' href="#action1">All</Nav.Link>
        <Nav.Link style={isSelected === "Physics" ? { color: "white", backgroundColor: "rgb(170, 127, 255)" } : null} onClick={selectSubjectinNavbar} id="2" className='custom-navbar-text1-side text-center py-3' href="#action1">Physics</Nav.Link>
        <Nav.Link style={isSelected === "Chemistry" ? { color: "white", backgroundColor: "rgb(170, 127, 255)" } : null} onClick={selectSubjectinNavbar} id="3" className='custom-navbar-text1-side text-center py-3' href="#action1">Chemistry</Nav.Link>
        <Nav.Link style={isSelected === "Maths" ? { color: "white", backgroundColor: "rgb(170, 127, 255)" } : null} onClick={selectSubjectinNavbar} id="4" className='custom-navbar-text1-side text-center py-3' href="#action1">Maths</Nav.Link>
        <Nav.Link style={isSelected === "Biology" ? { color: "white", backgroundColor: "rgb(170, 127, 255)" } : null} onClick={selectSubjectinNavbar} id="5" className='custom-navbar-text1-side text-center py-3' href="#action1">Biology</Nav.Link>
    </div>
}

export default SideBar