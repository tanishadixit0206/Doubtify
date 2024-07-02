import { useState,useEffect} from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { maths, chemistry, biology, all, physics } from '../subjects';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./AddSolutionDiv.css"
import axios from 'axios'
import { useAuthContext } from "../hooks/UseAuthContext";
import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';



function ViewSolutionDiv(props) {

    

    async function deleteDoubt() {
        console.log(user)
        const response = await axios.delete(`http://localhost:5000/home/delete/${doubt.title}`, {
            headers: {
                'Authorization': `Bearer ${user}`
            }
        });

        console.log(response + " deleted")

        const response1 = await axios.get("http://localhost:5000/home", {
            headers: {
                'Authorization': `Bearer ${user}`
            }
        });

        props.submit_function(response1.data);
        seTb64("");
        seTb642("");
        setPostImage1({ myFile1: "" });
        setPostImage2({ myFile2: "" });
        setPic1(false);
        setPic2(false);
        props.hide_function();
    }



    const [b64, seTb64] = useState(props.q_url)
    const [b642, seTb642] = useState(props.sol_url)

    const [postImage1, setPostImage1] = useState({ myFile1: props.q_url })
    const [postImage2, setPostImage2] = useState({ myFile2: props.sol_url })

    const [pic1, setPic1] = useState(false)
    const [pic2, setPic2] = useState(false)

    async function handlePicInsert1(e) {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        seTb64(base64)
        setPostImage1({ ...postImage1, myFile1: base64 })
        setPic1(true)
    }
    const { user } = useAuthContext()

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })

    }
    async function handlePicInsert2(e) {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        seTb642(base64)
        setPostImage2({ ...postImage2, myFile2: base64 })
        setPic2(true)
    }

    const [doubt, setDoubt] = useState({
        title: props.title,
        subject: props.subject,
        topic: props.topic,
    })

    const [value, setValue] = useState("");

    function onChange(event) {
        const { value, name } = event.target;
        setDoubt((prevValue) => {
            if (name === "title") {
                return {
                    title: value,
                    subject: prevValue.subject,
                    topic: prevValue.topic,
                    c_date: ""
                };
            } else if (name === "subject") {
                setValue(value)
                return {
                    title: prevValue.title,
                    subject: value,
                    topic: prevValue.topic,
                    c_date: ""
                };
            } else if (name === "topic") {
                return {
                    title: prevValue.title,
                    subject: prevValue.subject,
                    topic: value,
                    c_date: ""
                };
            }
        });
    }
    const [hover3, setHover3] = useState(false);

    function ishover3() {
        setHover3(true);
    }
    function isnothover3() {
        setHover3(false);
    }
    const [hover4, setHover4] = useState(false);

    function ishover4() {
        setHover4(true);
    }
    function isnothover4() {
        setHover4(false);
    }

    useEffect(() => {
        let options;
        switch (value) {
            case "All":
                options = all;
                break;
            case "Physics":
                options = physics;
                break;
            case "Chemistry":
                options = chemistry;
                break;
            case "Biology":
                options = biology;
                break;
            case "Maths":
                options = maths;
                break;
            default:
                options = [];
        }
        setOptions(options);
    }, [value]);
    const [options, setOptions] = useState([]);

    const values = ["All", "Physics", "Chemistry", "Maths", "Biology"];
    async function handleSubmit() {
        try {
                const response1 = await axios.put("http://localhost:5000/home/update", {
                    title: doubt.title,
                    subject: doubt.subject,
                    topic: doubt.topic,
                    q_url: b64,
                    sol_url: b642
                }, {
                    headers: {
                        'Authorization': `Bearer ${user}`,
                    }
                });
    
                console.log("Put response:", response1.data);
    
                const response = await axios.get("http://localhost:5000/home", {
                    headers: {
                        'Authorization': `Bearer ${user}`
                    }
                });
    
                console.log("Get response after post:", response.data);
    
                props.submit_function(response.data);
                seTb64("");
                seTb642("");
                setPostImage1({ myFile1: "" });
                setPostImage2({ myFile2: "" });
                setPic1(false);
                setPic2(false);
                props.hide_function();
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        }
    }
    return (
        <div style={{top:"11vh",left:"19vw", position: "fixed",borderRadius: "1%", padding: "0", backgroundColor: "rgb(240,240,240)", height: "80vh", overflowY: "scroll", scrollBehavior: "smooth", borderStyle: "solid", borderWidth: "1px", borderColor: "rgb(113, 44, 249)", color: "rgb(113, 44, 249)" }} className="container d-flex flex-column justify-content-start align-items-center col-lg-9 col-md-7 col-sm-6 col-xs-10 my-3 pb-3">
            <div style={{ width: "100%", textAlign: "center",alignItems:"center", backgroundColor: "rgb(113, 44, 249)",display:"flex",justifyContent:"space-between" }} className="mb-3 px-2">
             <div style={{flex:"80%"}}>
             <h1 style={{ color: "white" }} className="add-solution-heading my-3 ">Update Doubt</h1>
                </div>   
                <Fab color="primary" size="medium" onClick={props.hide_function} aria-label="cross" style={{backgroundColor:"white",color:"rgb(113,44,249)"}}>
                    <CloseIcon />
                </Fab>
            </div>

            <div class="dropzone d-block">
                <label for="files1" class="dropzone-container">
                    <img src={postImage1.myFile1} alt="" style={{width:"100%",height:"auto"}} />
                    <input id="files1" onChange={handlePicInsert1} name="files[]" type="file" class="file-input" accept=".jpeg,.jpg,.png" />
                </label>
            </div>

            <div className="form-container">
                <input required type="text" readOnly onChange={onChange} name="title" value={props.title} style={{ color: "rgb(113, 44, 249)", borderColor: "rgb(180,180,180)", backgroundColor: "rgba(0,0,0,0)" }} class="form-control px-3 py-4 my-3" id="floatingInput" Autocomplete="off" placeholder="Title" />
                <Autocomplete required
                    className="my-3"
                    options={values}
                    value={doubt.subject}
                    style={{ width: "60vw"}}
                    renderInput={(params) => (
                        <TextField name="subject" onSelect={onChange} {...params} label="Subject" variant="outlined" />
                    )}
                />
                <Autocomplete required
                    className="my-3"
                    options={options}
                    value={doubt.topic}
                    style={{ width: "60vw"}}
                    renderInput={(params) => (
                        <TextField name="topic" onSelect={onChange} {...params} label="Topic" variant="outlined" />
                    )}
                />
            </div>
            <div class="dropzone d-block">
                <label for="files2" class="dropzone-container">
                {postImage2.myFile2 === "" ? <div>
                        <div class="file-icon"><i class="fa-solid fa-file-circle-plus text-primary"></i></div>
                        <div class="text-center pt-3 px-5">
                            <p class="w-80 h5 text-dark fw-bold">To add a doubt</p>
                            <p class="w-80 h5 text-dark fw-bold">Drag your documents, photos or videos here to start uploading.</p>
                            </div>
                    </div> : <img src={postImage2.myFile2} alt="" style={{width:"100%",height:"auto"}} />}
                <input id="files2" onChange={handlePicInsert2} name="files[]" type="file" class="file-input" accept=".jpeg,.jpg,.png" />
           </label>
            </div>

            <div style={{display:"flex"}}>
            <button style={!hover3 ? {
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
              }} class="btn btn-primary my-3 mx-3" onClick={handleSubmit} onMouseEnter={ishover3} onMouseLeave={isnothover3}>Submit</button>
              <button style={!hover4 ? {
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
              }} class="btn btn-primary my-3 mx-3 " onClick={deleteDoubt} onMouseEnter={ishover4} onMouseLeave={isnothover4}>Delete</button>
            </div>
            
        </div>
    );
}
export default ViewSolutionDiv