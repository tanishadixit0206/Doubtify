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
    import ViewSolutionDiv from "../components/ViewSolutionDiv";
    function Home() {
        const {user} = useAuthContext()
        const [doubts,setDoubts] = useState([])
        const [expandDoubtTitle,setExpandDoubtTitle] = useState("")
        const [expandDoubt,setExpandDoubt] = useState({
            title:expandDoubtTitle,
            topic : "",
            subject:"",
            q_url:"",
            sol_url:""
        })


        async function expand(title) {
            try {
              setExpandDoubtTitle(title);

              const response = await axios.get(`http://localhost:5000/home/select/${expandDoubtTitle}`,{
                headers: {
                  'Authorization': `Bearer ${user}`,
                }
              });
              console.log(response)

              setExpandDoubt({
                title: expandDoubtTitle,
                topic: response.data.topic,
                subject: response.data.subject,
                q_url: response.data.q_url,
                sol_url: response.data.sol_url,
              });
          
              setIsClicked2(true);
            } catch (error) {
              console.error("Error expanding doubt:", error.message);
            } 
          }
          

        function minimiseViewSolnDiv(){
            setIsClicked2(false)
        }


        const [isClicked2,setIsClicked2] = useState(false)


//fetching doubts from backend
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
                    {doubts.map((doubt)=>{ return <Tile expand_function={expand} image={doubt.q_url} title={doubt.title} subject={doubt.subject} sol_image={doubt.sol_url} topic={doubt.topic} date={doubt.date.substring(0,10)}/>
                    })}
                </div>
                <Fab onClick={handleClick} size="large" style={{backgroundColor:"rgb(113,44,249)",color:"white",position:"fixed",bottom:"4vh",right:"2vw",zIndex:"1000"}}>
                {isClicked ? <AddIcon/>:<CloseIcon/> } 
                </Fab>
                {
                    !isClicked ? <AddSolutionDiv  hide_function={handleClick} submit_function = {filterDoubts} />:null
                }
                {
                    isClicked2 ? <ViewSolutionDiv hide_function={minimiseViewSolnDiv} submit_function={filterDoubts} title={expandDoubt.title} subject={expandDoubt.subject} topic={expandDoubt.topic} q_url={expandDoubt.q_url} sol_url={expandDoubt.sol_url} />:null
                }
            </div>
            </SubjectProvider>
        )
    }

    export default Home