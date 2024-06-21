import { useState, useEffect } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { maths, chemistry, biology, all, physics } from '../subjects';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import "./AddSolutionDiv.css"

function AddSolutionDiv(props) {
    
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
    const [doubt,setDoubt]=useState({
        title:"",
        subject:"",
        topic:"",
        c_date:""
    })
    function onChange(event) {
        const { value, name } = event.target;
        setDoubt((prevValue) => {
          if (name === "title") {
            return {
              title:value,
              subject:prevValue.subject,
              topic:prevValue.topic,
              c_date:""
            };
          } else if (name === "subject") {
            setValue(value)
            return {
                title:prevValue.title,
                subject:value,
                topic:prevValue.topic,
                c_date:""
              };
          } else if (name === "topic") {
            return {
                title:prevValue.title,
                subject:prevValue.subject,
                topic:value,
                c_date:""
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
        <div style={{position:"fixed",bottom:"1vh",right:"2vh", borderRadius: "1%", padding: "0", backgroundColor: "rgb(240,240,240)", height: "80vh", overflowY: "scroll", scrollBehavior: "smooth", borderStyle: "solid", borderWidth: "1px", borderColor: "rgb(113, 44, 249)", color: "rgb(113, 44, 249)" }} className="container d-flex flex-column justify-content-start align-items-center col-lg-9 col-md-7 col-sm-6 col-xs-10 my-3 pb-3">
            <div style={{ width: "100%", textAlign: "center", backgroundColor: "rgb(113, 44, 249)" }} className="mb-3">
                <h1 style={{ color: "white" }} className="add-solution-heading my-3 ">Add a Doubt</h1>
            </div>

            <div class="dropzone d-block">
                <label for="files" class="dropzone-container">
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
                </label>
                <input id="files" name="files[]" type="file" class="file-input" />
            </div>
            <div className="form-container">
            <input type="text" onChange={onChange} name="title" value={doubt.title} style={{color:"rgb(113, 44, 249)",borderColor:"rgb(180,180,180)",backgroundColor:"rgba(0,0,0,0)"}} class="form-control px-3 py-4 my-3" id="floatingInput" Autocomplete="off" placeholder="Title"/>
                <Autocomplete
                    className="my-3"
                    options={values}
                    style={{ width: "60vw" }}
                    renderInput={(params) => (
                        <TextField name="subject" onSelect={onChange} {...params} label="Subject" variant="outlined" />
                    )}
                />
                <Autocomplete
                    className="my-3"
                    options={options}
                    style={{ width: "60vw" }}
                    renderInput={(params) => (
                        <TextField name="topic" onSelect={onChange} {...params} label="Topic" variant="outlined" />
                    )}
                />
            </div>
            <div class="dropzone d-block">
                <label for="files" class="dropzone-container">
                    <div class="file-icon"><i class="fa-solid fa-file-circle-plus text-primary"></i></div>
                    <div class="text-center pt-3 px-5">
                        <p class="w-80 h5 text-dark fw-bold">To add a solution</p>
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
                </label>
                <input id="files" name="files[]" type="file" class="file-input" />
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
                        }} class="btn btn-primary my-3 " onClick={()=>{
                            props.submit_function()
                        }}  onMouseEnter={ishover3} onMouseLeave={isnothover3}>Submit</button>
        </div>
    );
}

export default AddSolutionDiv;
