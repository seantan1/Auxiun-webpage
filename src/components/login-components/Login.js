import { useState } from "react";
import './css/Login.css';

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

const Login = (props) => {

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

    const login = () => {
        axios.post(process.env.REACT_APP_API_USER_LOGIN_URL, {
            apikey: process.env.REACT_APP_PRIVATE_API_KEY,
            email: String(userEmailLoginForm),
            password_hash: String(userPasswordLoginForm)
        }).then(function (data) {
            if (data.data.message === "fail") {
                console.log("Username or password is incorrect");
                // TODO: set alert using props from App.js
            }
            else if (data.data.message === "success") {
                console.log("Login successful!");
                // TODO: set alert using props from App.js, set authenticated useStates from App.js
                // setUserId(data.data.data[0]._id);
                // setUserUsername(data.data.data[0].username);
                // setAuthenticated(true);
            }
            else {
                console.log("Unknown error occured. Please try again.");
                // TODO: set alert using props from App.js
            }
        })
    }

    return (
        <div>
            <div className="login-container">
                <h1 className="title-text">Login</h1>
                <p className="title-text">Enter your streamer credentials</p>
                <CssTextField className="text-field" label="Username" variant="outlined" onChange={userEmailLoginFormHandler} /><br></br><br></br>
                <CssTextField className="text-field" label="Password" type="password" variant="outlined" onChange={userPasswordLoginFormHandler} /><br></br><br></br>
                <Button id="donate-button" variant="contained" color="primary" onClick={login}>Login</Button>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default Login;
