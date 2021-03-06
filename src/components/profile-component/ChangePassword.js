import { TextField, Typography, Button } from '@material-ui/core'
import React, {useContext} from 'react'
import { Label } from 'semantic-ui-react'
import { useForm } from '../hooks/useForm'
import darkThemeContext from "../darkThemeContext";
import { useStyles } from './styles/UpdatedProfileStyles';
const axios = require("axios")

export const ChangePassword = (props) => {

    const { darkTheme } = useContext(darkThemeContext);
    // For the dark theme props (to be passed in useStyles)
    const darkThemeProps = {darkTheme: darkTheme}
    const classes = useStyles(darkThemeProps)

    const initialState = {currentPassword: "", newPassword: "", confirmPassword: ""}
    const {fields, handleInputChange} = useForm(initialState)


    const handleUpdatePassword = async () => {
        // If all fields are empty, then return
		if(!fields.currentPassword | !fields.newPassword | !fields.confirmPassword) {
			props.setAlertMessage({error: true, message: "Password areas need to be filled."})
			props.setShowAlert(true)
			return
		}
        if(fields.confirmPassword !== fields.newPassword) {
            props.setAlertMessage({error: true, message: "Confirm Password does not match New Password"})
			props.setShowAlert(true)
			return
        }

		// Set up the request
		const user = JSON.parse(localStorage.getItem("userSessionData"))
		const data = {
			apikey: process.env.REACT_APP_DATABASE_API_KEY,
			old_password: fields.currentPassword,
            new_password: fields.newPassword,
		}

		// Make the request
		var response;
		try{
			response = await axios.patch(process.env.REACT_APP_DATABASE_API_UPDATE_PASSWORD_URL+user._id, data)
            console.log(response)
		} catch(error){
			console.log(error)
		}
		
		if(response.status === 200){
            if(response.data.status === "success"){
                const updatedUser = response.data.data
			    localStorage.setItem("userSessionData", JSON.stringify(updatedUser))
                // Direct user to login again with their new password
                window.location.href = "/login"
            } else if(response.data.status === "fail") {
                props.setAlertMessage({error: true, message:response.data.message})
                props.setShowAlert(true)
            }
		} else {
			console.log("Error: Failed to update")
		}
    }

    return (
        <div className="page-no-top-padding">
            <TextField
                InputProps={{ 
                    classes: {
                        root: classes.textFieldStyleRoot
                    }
                }}
                InputLabelProps={{ 
                    classes: {
                        root: classes.textFieldLabel,
                        focused: classes.textFieldLabelFocused
                    }
                }}
                type="password" 
                label="Current Password"
                name="currentPassword" 
                value={fields.currentPassword}
                onChange={handleInputChange}
                />
            <TextField
                InputProps={{ 
                    classes: {
                        root: classes.textFieldStyleRoot
                    }
                }}
                InputLabelProps={{ 
                    classes: {
                        root: classes.textFieldLabel,
                        focused: classes.textFieldLabelFocused
                    }
                }}
                type="password"
                label="New Password"
                name="newPassword"
                value={fields.newPassword}
                onChange={handleInputChange}
                />
            <TextField
                InputProps={{ 
                    classes: {
                        root: classes.textFieldStyleRoot
                    }
                }}
                InputLabelProps={{ 
                    classes: {
                        root: classes.textFieldLabel,
                        focused: classes.textFieldLabelFocused
                    }
                }}
                type="password" 
                label="Confirm Password"
                name="confirmPassword" 
                value={fields.confirmPassword}
                onChange={handleInputChange}
                />
            <Button variant={darkTheme ? "contained" : "outlined"} color="primary" onClick={handleUpdatePassword}>
                <Typography>Update Password</Typography>
            </Button>
            <div className={classes.labelStyle}>You will need to log in again with your new password</div>
        </div>
    )
}
