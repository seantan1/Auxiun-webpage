import './css/ForgotPassword.css';

import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { Button, Icon } from '@material-ui/core';
import { useState } from 'react';

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

export default function ForgotPassword(props) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onPasswordUpdate = (event) => {
        setPassword(event.target.value);
    }

    const onConfirmPasswordUpdate = (event) => {
        setConfirmPassword(event.target.value);
    }

    const submitHandler = () => {
        if (password !== confirmPassword) {
            props.showAlert("Passwords do not match", "The two passwords do not match", "", "error");
        } else {
            //change password code
        }
    }

    return (
        <div className="forgotPassword-page">
            <div className="fp-content">
                <h1 className="title-text">Password Reset</h1>
                <CssTextField className="text-field" style={{width:'300px'}} label="Email" required variant="outlined" /><br></br><br></br>
                <CssTextField className="text-field" style={{width:'300px'}} label="New Password" required type="password" variant="outlined" onChange={onPasswordUpdate}  /><br></br><br></br>
                <CssTextField className="text-field" style={{width:'300px'}} label="Confirm New Password" required type="password" variant="outlined" onChange={onConfirmPasswordUpdate}  /><br></br><br></br>
                <Button id="change-password-button" variant="contained" required color="primary" onClick={submitHandler}>Change Password</Button>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}