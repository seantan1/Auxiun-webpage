import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import './css/Register.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import darkThemeContext from "../darkThemeContext";

const axios = require('axios');

export default function Register(props) {
    const history = useHistory();
    const { darkTheme } = useContext(darkThemeContext);

    // CssTextField
    const CssTextField = withStyles({
        root: {
            "& input": {
                color: darkTheme === true ? '#EBEBEB' : "blue"
            },
            "& label": {
                color: darkTheme === true ? 'gray' : "#b3b3b3"
            },
            "&:hover label": {
                color: darkTheme === true ? '#EBEBEB' : "blue"
            },
            "& label.Mui-focused": {
                color: darkTheme === true ? '#EBEBEB' : "blue"
            },
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: darkTheme === true ? '#EBEBEB' : "#b3b3b3"
                },
                "&:hover fieldset": {
                    borderColor: darkTheme === true ? '#EBEBEB' : "blue"
                },
                "&.Mui-focused fieldset": {
                    borderColor: darkTheme === true ? '#EBEBEB' : "blue"
                }
            }
        },
    })(TextField);

    // login form
    const [userEmailRegisterForm, setuserEmailRegisterForm] = useState('');
    const [userFirstNameRegisterForm, setUserFirstNameRegisterForm] = useState('');
    const [userLastNameRegisterForm, setUserLastNameRegisterForm] = useState('');
    const [userPasswordRegisterForm, setUserPasswordRegisterForm] = useState('');
    const [userConfirmPasswordRegisterForm, setUserConfirmPasswordRegisterForm] = useState('');

    // event handlers for email, name, password
    const userEmailRegisterFormHandler = (event) => {
        setuserEmailRegisterForm(event.target.value);
    }
    const userFirstNameRegisterFormHandler = (event) => {
        setUserFirstNameRegisterForm(event.target.value);
    }
    const userLastNameRegisterFormHandler = (event) => {
        setUserLastNameRegisterForm(event.target.value);
    }
    const userPasswordRegisterFormHandler = (event) => {
        setUserPasswordRegisterForm(event.target.value);
    }
    const userConfirmPasswordRegisterFormHandler = (event) => {
        setUserConfirmPasswordRegisterForm(event.target.value);
    }

    const register = () => {
        if (userConfirmPasswordRegisterForm !== userPasswordRegisterForm) {
            props.showAlert("Passwords not the same", "Ensure you have typed in the same passwords.", "", "error");
            return; // abort function
        }

        axios.post(process.env.REACT_APP_DATABASE_API_REGISTER_URL, {
            apikey: String(process.env.REACT_APP_DATABASE_API_KEY),
            email: String(userEmailRegisterForm),
            firstname: String(userFirstNameRegisterForm),
            lastname: String(userLastNameRegisterForm),
            password_hash: String(userPasswordRegisterForm),
        }).then(function (data) {
            if (data.data.errors) {
                console.log("Email has been taken.");
                props.showAlert("User Taken", "Email is already registered in the system", "", "error");
            }
            else if (data.status === 200) {
                console.log("Registration successful!");
                props.showAlert("Success", "User has been successfully created", "", "success");
                history.push("/login");
            }
            else {
                console.log("Unknown error occured. Please try again.");
                props.showAlert("Unknown", "An Unknown Error has Occured, Please Try Again", "", "error");
            }
        })
    }

    return (
        <div className={`register-page`}>
            <div className="content">
                <h1 className="title-text">Sign Up Today!</h1>
                <CssTextField className="text-field" label="First Name" style={{ width: '300px' }} required variant="outlined" onChange={userFirstNameRegisterFormHandler} /><br></br><br></br>
                <CssTextField className="text-field" label="Last Name" style={{ width: '300px' }} required variant="outlined" onChange={userLastNameRegisterFormHandler} /><br></br><br></br>
                <CssTextField className="text-field" label="Email" style={{ width: '300px' }} required variant="outlined" onChange={userEmailRegisterFormHandler} /><br></br><br></br>
                <CssTextField className="text-field" label="Password" style={{ width: '300px' }} required type="password" variant="outlined" onChange={userPasswordRegisterFormHandler} /><br></br><br></br>
                <CssTextField className="text-field" label="Confirm Password" style={{ width: '300px' }} required type="password" variant="outlined" onChange={userConfirmPasswordRegisterFormHandler} /><br></br><br></br>
                <Grid container spacing={1} justify="center">
                    <Grid item>
                        <Button id="sign-up-button" className="sign-up-button" variant="contained" color="primary" onClick={register}>Register</Button>
                    </Grid>
                    <Grid item>
                        <Button id="return-button" variant="contained" color="secondary" href="/login">Back</Button>
                    </Grid>
                </Grid>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}