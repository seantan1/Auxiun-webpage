import React, { useState } from "react";
import './css/Register.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
const axios = require('axios');

// CssTextField
const CssTextField = withStyles({
    root: {
        "& input": {
            color: "blue"
        },
        "& label": {
            color: "#b3b3b3"
        },
        "&:hover label": {
            color: "blue"
        },
        "& label.Mui-focused": {
            color: "blue"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#b3b3b3"
            },
            "&:hover fieldset": {
                borderColor: "blue"
            },
            "&.Mui-focused fieldset": {
                borderColor: "blue"
            }
        }
    }
})(TextField);

export default function Register() {

    // TODO: change variable names to register
    // login form
    const [userEmailRegisterForm, setuserEmailRegisterForm] = useState('');
    const [userPasswordRegisterForm, setUserPasswordRegisterForm] = useState('');

    // event handler for username
    const userEmailRegisterFormHandler = (event) => {
        setuserEmailRegisterForm(event.target.value);
    }
    // event handler for password
    const userPasswordRegisterFormHandler = (event) => {
        setUserPasswordRegisterForm(event.target.value);
    }

    const register = () => {
        axios.post(process.env.REACT_APP_DATABASE_API_REGISTER_URL, {
            apikey: String(process.env.REACT_APP_DATABASE_API_KEY),
            email: String(userEmailRegisterForm),
            password_hash: String(userPasswordRegisterForm),
        }).then(function (data) {
            if(data.data.errors) {
                console.log("Email has been taken.");
            }
            else if (data.status === 200) {
                console.log("Registration successful!");
            }
            else {
                console.log("Unknown error occured. Please try again.");
            }
        })
    }

    return (
        <div className="register-page">
            <h1 className="title-text">Register as a user</h1>
            <CssTextField className="text-field" label="Email" variant="outlined" onChange={userEmailRegisterFormHandler} /><br></br><br></br>
            <CssTextField className="text-field" label="Password" type="password" variant="outlined" onChange={userPasswordRegisterFormHandler} /><br></br><br></br>

            <Button id="donate-button" variant="contained" color="primary" onClick={register}>Register</Button>
            <br></br>
            <br></br>
        </div>
    );
}