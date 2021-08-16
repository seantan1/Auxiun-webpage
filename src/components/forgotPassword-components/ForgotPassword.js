import './css/ForgotPassword.css';

import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { Button, Icon } from '@material-ui/core';

export default function ForgotPassword() {
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

    return (
        <div className="forgotPassword-page">
            <div className="fp-content">
                <h1 className="title-text">Password Reset</h1>
                <CssTextField className="text-field" label="Email" variant="outlined" /><br></br><br></br>
                <CssTextField className="text-field" label="New Password" type="password" variant="outlined" /><br></br><br></br>
                <CssTextField className="text-field" label="Confirm New Password" type="password" variant="outlined" /><br></br><br></br>
                <Button id="change-password-button" variant="contained" color="primary">Change Password</Button>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}