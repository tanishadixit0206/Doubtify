import { useState, useEffect } from "react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import doubt from '../images/doubt.jpeg'
import { maths, chemistry, biology, all, physics } from '../subjects'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function AddSolutionDiv() {
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState("")

    function onChange(event) {
        console.log(event.target.value)
        setValue(event.target.value)
    }
    const values = ["All", "Physics", "Chemistry", "Maths", "Biology"]
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
                options = chemistry
                break;
            case "Biology":
                options = biology
                break;
            case "Maths":
                options = maths
                break;
            default:
                options = [];
        }
        setOptions(options);
    }, [value]);

    return <div className="container col-lg-8">
        <h1>Add a Doubt!</h1>
        <div className="img-container">
            <img src={doubt} alt="image" />
        </div>
        <div className="form-container">
            <Autocomplete
                options={values}
                style={{ width: 300 }}
                renderInput={(params) =>
                    <TextField onSelect={onChange} {...params} label="Combo box" variant="outlined" />}
            />
            <Autocomplete
                options={options}
                style={{ width: 300 }}
                renderInput={(params) =>
                    <TextField {...params} label="Combo box" variant="outlined" />}
            />
        </div>
    </div>

}
export default AddSolutionDiv