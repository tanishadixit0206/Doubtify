import { useState, useEffect } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { maths, chemistry, biology, all, physics } from '../subjects';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./AddSolutionDiv.css"
import axios from 'axios'
import { useAuthContext } from "../hooks/UseAuthContext";


function AddSolutionDiv(props) {
    const [b64, seTb64] = useState("")
    const [b642, seTb642] = useState("")

    const [postImage1, setPostImage1] = useState({ myFile1: "" })
    const [postImage2, setPostImage2] = useState({ myFile2: "" })

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

    async function handlePicInsert1(e) {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        seTb64(base64)
        setPostImage1({ ...postImage1, myFile1: base64 })
        setPic1(true)
    }

    async function handlePicInsert2(e) {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        seTb642(base64)
        setPostImage2({ ...postImage2, myFile2: base64 })
        setPic2(true)
    }


    async function handleSubmit() {
        var dup = false
        const response1 = await axios.get("http://localhost:5000/home", {
            headers: {
                'Authorization': `Bearer ${user}`
            }
        })
        for (let i = 0; i < response1.data.length; i++) {
            const element = response1.data[i];
            if (element.title === doubt.title) {
                dup = true
            }
        }
        if (dup === false) {
            
            await axios.post("http://localhost:5000/home/add_pic", {
                title: doubt.title,
                subject: doubt.subject,
                topic: doubt.topic,
                q_url: b64,
                sol_url: b642
            }, {
                headers: {
                    'Authorization': `Bearer ${user}`,
                }
            })
            back_to_home()
        }
        else {
            props.hide_function()
        }
    }
    async function back_to_home() {
        var doubts_array = []
        const response = await axios.get("http://localhost:5000/home", {
            headers: {
                'Authorization': `Bearer ${user}`
            }
        })
        console.log(response.data)
        doubts_array = response.data
        props.submit_function(doubts_array)
        seTb64("")
        seTb642("")
        setPostImage1({ myFile1: "" })
        setPostImage2({ myFile2: "" })
        setPic1(false)
        setPic2(false)
        console.log("kaise ho")
        props.hide_function()
    }
    
    const [pic1, setPic1] = useState(false)
    const [pic2, setPic2] = useState(false)
    const [hover1, setHover1] = useState(false);

    function ishover1() {
        setHover1(true);
    }
    function isnothover1() {
        setHover1(false);
    }
    const [hover2, setHover2] = useState(false);

    function ishover2() {
        setHover2(true);
    }
    function isnothover2() {
        setHover2(false);
    }

    const [hover3, setHover3] = useState(false);

    function ishover3() {
        setHover3(true);
    }
    function isnothover3() {
        setHover3(false);
    }

    const [options, setOptions] = useState([]);
    const [value, setValue] = useState("");
    const [doubt, setDoubt] = useState({
        title: "",
        subject: "",
        topic: "",
    })
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


    const values = ["All", "Physics", "Chemistry", "Maths", "Biology"];

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

    return (
        <div style={{ position: "fixed", bottom: "1vh", right: "2vh", borderRadius: "1%", padding: "0", backgroundColor: "rgb(240,240,240)", height: "80vh", overflowY: "scroll", scrollBehavior: "smooth", borderStyle: "solid", borderWidth: "1px", borderColor: "rgb(113, 44, 249)", color: "rgb(113, 44, 249)" }} className="container d-flex flex-column justify-content-start align-items-center col-lg-9 col-md-7 col-sm-6 col-xs-10 my-3 pb-3">
            <div style={{ width: "100%", textAlign: "center", backgroundColor: "rgb(113, 44, 249)" }} className="mb-3">
                <h1 style={{ color: "white" }} className="add-solution-heading my-3 ">Add a Doubt</h1>
            </div>

            <div class="dropzone d-block">

                <label for="files1" class="dropzone-container">
                    {!pic1 ? <div >
                        <div class="file-icon"><i class="fa-solid fa-file-circle-plus text-primary"></i></div>
                        <div class="text-center pt-3 px-5">
                            <p class="w-80 h5 text-dark fw-bold">To add a doubt</p>
                            <p class="w-80 h5 text-dark fw-bold">Drag your documents, photos or videos here to start uploading.</p>
                            <div class="hr-sect">or</div>
                            <button style={!hover1 ? {
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
                            }} class="btn btn-primary mb-2" onMouseEnter={ishover1} onMouseLeave={isnothover1}>Browse Files</button>
                        </div>
                    </div> : <img src={postImage1.myFile1} alt="" />}
                    <input id="files1" onChange={handlePicInsert1} name="files[]" type="file" class="file-input" accept=".jpeg,.jpg,.png" />
                </label>
            </div>

            <div className="form-container">
                <input required type="text" onChange={onChange} name="title" value={doubt.title} style={{ color: "rgb(113, 44, 249)", borderColor: "rgb(180,180,180)", backgroundColor: "rgba(0,0,0,0)" }} class="form-control px-3 py-4 my-3" id="floatingInput" Autocomplete="off" placeholder="Title" />
                <Autocomplete required
                    className="my-3"
                    options={values}
                    style={{ width: "60vw" }}
                    renderInput={(params) => (
                        <TextField name="subject" onSelect={onChange} {...params} label="Subject" variant="outlined" />
                    )}
                />
                <Autocomplete required
                    className="my-3"
                    options={options}
                    style={{ width: "60vw" }}
                    renderInput={(params) => (
                        <TextField name="topic" onSelect={onChange} {...params} label="Topic" variant="outlined" />
                    )}
                />
            </div>

            <div class="dropzone d-block">
                <label for="files2" class="dropzone-container">
                    {!pic2 ? <div>
                        <div class="file-icon"><i class="fa-solid fa-file-circle-plus text-primary"></i></div>
                        <div class="text-center pt-3 px-5">
                            <p class="w-80 h5 text-dark fw-bold">To add a doubt</p>
                            <p class="w-80 h5 text-dark fw-bold">Drag your documents, photos or videos here to start uploading.</p>
                            <div class="hr-sect">or</div>
                            <button style={!hover2 ? {
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
                            }} class="btn btn-primary mb-2" onMouseEnter={ishover2} onMouseLeave={isnothover2}>Browse Files</button>
                        </div>
                    </div> : <img src={postImage2.myFile2} alt="" />}
                </label>
                <input id="files2" onChange={handlePicInsert2} name="files[]" type="file" class="file-input" accept=".jpeg,.jpg,.png" />
            </div>
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
            }} class="btn btn-primary my-3 " onClick={handleSubmit} onMouseEnter={ishover3} onMouseLeave={isnothover3}>Submit</button>
        </div>
    );
}

export default AddSolutionDiv;
