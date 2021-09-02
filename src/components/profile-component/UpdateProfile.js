import { useState, useEffect } from "react";
import "./css/updateProfile.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Collapse} from "@material-ui/core";
import { ChangePassword } from "./ChangePassword";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useStyles } from "./styles/UpdatedProfileStyles"
import "./styles/updateProfile.css"
import { useForm } from "../hooks/useForm";

const UpdateProfile = (props) => {
    const classes = useStyles()
    const [showPasswordForm, setShowPasswordForm] = useState(false)

    const initialState = {firstname: "", lastname: ""}
    const {fields, setFields, handleInputChange} = useForm(initialState)

    const handleShowPasswordForm = () => {
        if(showPasswordForm){
        setShowPasswordForm(false)
        } else {
        setShowPasswordForm(true)
        }
    }

    const handleUpdateUser = () => {

    }

  return (

    <div className="page">
        <div className={classes.borderedContainerLight}>
            <div className={classes.center}>
                <Typography  className={classes.mediumText}>Update Profile</Typography>
            </div>

            
            <TextField
                id="firstname"
                label="First Name"
                placeholder={props.userSessionData.firstname}
                name="firstname"
                value={fields.firstname}
                onChange={handleInputChange}
                helperText="Leave blank if you do not wish to change"
            />

            <TextField
                id="lastname"
                label="Last Name"
                placeholder={props.userSessionData.lastname}
                name="lastname"
                value={fields.lastname}
                onChange={handleInputChange}
                helperText="Leave blank if you do not wish to change"
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
            <ChangePassword />
            </Collapse>
        </div>
    </div>
  );
};

export default UpdateProfile;
