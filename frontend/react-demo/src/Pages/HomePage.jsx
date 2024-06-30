    import React, { useEffect, useState } from "react";
    import NavBar from "../components/Navbar"
    import 'bootstrap/dist/css/bootstrap.min.css';
    import SideBar from "../components/Sidebar";
    import { useAuthContext } from "../hooks/UseAuthContext";
    import AddIcon from "@mui/icons-material/Add";
    import { Fab } from "@mui/material";
    import { SubjectProvider } from "../context/SubjectContext";
    import AddSolutionDiv from "../components/AddSolutionDiv";
    import CloseIcon from '@mui/icons-material/Close';
    import axios from "axios";
    import Tile from "../components/Tile"

    function Home() {
        const {user} = useAuthContext()
        const [doubts,setDoubts] = useState([])
        const getDoubts = async ()=>{
            const response  =  await axios.get("http://localhost:5000/home",{headers:{
            'Authorization':`Bearer ${user}`
        }})
        console.log(response)
        setDoubts(response.data)
        }
        useEffect(()=>{
            getDoubts()
        },[])

        function filterDoubts(doubts_array){
            setDoubts(doubts_array)
        }

        const [isClicked,setIsClicked] = useState(true)
        
        function handleClick(){
            setIsClicked(!isClicked)
        }
        return (
            <SubjectProvider>
            <div>
                <NavBar searchFunction={filterDoubts}  />
                <SideBar searchFunction={filterDoubts} />
                <div style={{marginLeft:"18vw",marginTop:"10vh"}} className="col-lg-10 d-flex flex-wrap  px-2 ">
                    {doubts.map((doubt)=>{ return <Tile image={doubt.q_url} title={doubt.title} subject={doubt.subject} sol_image={doubt.sol_url} topic={doubt.topic} date={doubt.date.substring(0,10)}/>
                    })}
                </div>
                
                <Fab onClick={handleClick} size="large" style={{backgroundColor:"rgb(113,44,249)",color:"white",position:"fixed",bottom:"4vh",right:"2vw",zIndex:"1000"}}>
                {isClicked ? <AddIcon/>:<CloseIcon/> } 
                </Fab>
                {
                    !isClicked ? <AddSolutionDiv  hide_function={handleClick} submit_function = {filterDoubts} />:null
                }
            </div>
            </SubjectProvider>
        )
    }

    export default Home