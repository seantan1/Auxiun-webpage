import React, { useState } from "react";
import './css/Register.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
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
    const [userEmailLoginForm, setuserEmailLoginForm] = useState('');
    const [userPasswordLoginForm, setUserPasswordLoginForm] = useState('');

    // event handler for username
    const userEmailLoginFormHandler = (event) => {
        setuserEmailLoginForm(event.target.value);
    }
    // event handler for password
    const userPasswordLoginFormHandler = (event) => {
        setUserPasswordLoginForm(event.target.value);
    }

    const register = () => {
        // TODO: modify this 
        // axios.post(process.env.REACT_APP_API_STREAMER_REGISTER_URL, {
        //     apikey: String(process.env.REACT_APP_PRIVATE_API_KEY),
        //     username: String(streamerUsername),
        //     password_hash: String(streamerPassword),
        //     wallet_address: String(streamerWallet),
        //     profile_image_link: String(streamerImage)
        // }).then(function (data) {
        //     if(data.data.errors) {
        //         setAlert("Username has been taken.", false);
        //     }
        //     else if (data.status === 200) {
        //         setAlert("Registration successful!", true);
        //     }
        //     else {
        //         setAlert("Unknown error occured. Please try again.", false);
        //     }
        // })
    }

    return (
        <div className="register-page">
            <div className="content">
                <h1 className="title-text">Sign Up Today!</h1>
                <Grid container className="sign-up__outer" justify="center" spacing={2}>
                    <Grid item xs={12} s={6} md={2} className="sign-up__inner1">
                        <CssTextField className="text-field" label="First Name" variant="outlined" /><br></br><br></br>
                        <CssTextField className="text-field" label="Last Name" variant="outlined" /><br></br><br></br>
                        <CssTextField className="text-field" label="Email" variant="outlined" onChange={userEmailLoginFormHandler} /><br></br><br></br>
                    </Grid>
                    <Grid item xs={12} s={6} md={2} className="sign-up__inner2">
                        <CssTextField className="text-field" label="Password" type="password" variant="outlined" onChange={userPasswordLoginFormHandler} /><br></br><br></br>
                        <CssTextField className="text-field" label="Confirm Password" type="password" variant="outlined" onChange={userPasswordLoginFormHandler} /><br></br><br></br>

                        <Grid container spacing={1} justify="center">
                            <Grid item>
                                <Button id="sign-up-button" className="sign-up-button" variant="contained" color="primary" onClick={register}>Register</Button>
                            </Grid>
                            <Grid item>
                                <Button id="return-button" variant="contained" color="secondary">Log In</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}