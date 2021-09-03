import { useState, useEffect } from "react";
import "./styles/updateProfile.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Collapse} from "@material-ui/core";
import { ChangePassword } from "./ChangePassword";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useStyles } from "./styles/UpdatedProfileStyles"
import "./styles/updateProfile.css"
import { useForm } from "../hooks/useForm";
import { Profiler } from "react";
import { ProfileAlert } from "./ProfileAlert";
const axios = require("axios");


const UpdateProfile = (props) => {

    const classes = useStyles()
    const [showPasswordForm, setShowPasswordForm] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const [alertMessage, setAlertMessage] =useState({error: false, message: ""})
    const initialState = {firstname: "", lastname: ""}
    const {fields, handleInputChange} = useForm(initialState)

    const handleShowPasswordForm = () => {
        if(showPasswordForm){
        setShowPasswordForm(false)
        } else {
        setShowPasswordForm(true)
        }
    }

    const handleUpdateUser = async () => {
		// If both are empty, then return
		if(!fields.firstname & !fields.lastname) {
			setAlertMessage({error: true, message: "Nothing to update."})
			setShowAlert(true)
			return
		}

		// Set up the request
		const user = JSON.parse(localStorage.getItem("userSessionData"))
		const data = {
			apikey: process.env.REACT_APP_DATABASE_API_KEY,
			firstname: fields.firstname,
			lastname: fields.lastname
		}

		// Make the request
		var response;
		try{
			response = await axios.patch(process.env.REACT_APP_DATABASE_API_UPDATE_USER_URL+user._id, data)
		} catch(error){
			console.log(error)
		}
		
		if(response.status === 200){
			const updatedUser = response.data.data
			localStorage.setItem("userSessionData", JSON.stringify(updatedUser))
			// Refresh to get the user again from App
			window.location.reload()
		} else {
			console.log("Error: Failed to update")
		}
		
    }

  return (
    <div className="page">
        <div className={classes.borderedContainerLight}>
			<Collapse in={showAlert}>
				<ProfileAlert setShowAlert={setShowAlert} alertMessage={alertMessage} />
			</Collapse>
            <div className={classes.center}>
                <Typography  className={classes.mediumText}>Update Profile</Typography>
            </div>

            <TextField
                id="firstname"
                placeholder={props.userSessionData.firstname}
                name="firstname"
                value={fields.firstname}
                onChange={handleInputChange}
                helperText="Firstname"
            />

            <TextField
                id="lastname"
                placeholder={props.userSessionData.lastname}
                name="lastname"
                value={fields.lastname}
                onChange={handleInputChange}
                helperText="Lastname"
            />
            
            <Button variant="outlined" color="primary" onClick={handleUpdateUser}>
            <Typography>Update Profile</Typography>
            </Button>
            <br></br>

            <Button 
                variant="outlined"
                onClick={handleShowPasswordForm}>
                Change Password
                {
                    showPasswordForm
                    ?
                    <ArrowDropUpIcon />
                    :
                    <ArrowDropDownIcon/>
                }
            </Button>
            <Collapse in={showPasswordForm}>
            	<ChangePassword 
					setAlertMessage={setAlertMessage} 
					setShowAlert={setShowAlert}
				/>
            </Collapse>
        </div>
    </div>
  );
};

export default UpdateProfile;
