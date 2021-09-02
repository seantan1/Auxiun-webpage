import { useState, useEffect } from "react";
import "./css/updateProfile.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Collapse} from "@material-ui/core";
import { ChangePassword } from "./ChangePassword";
import "./css/updateProfile.css"
const UpdateProfile = (props) => {


  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const handleShowPasswordForm = () => {
    if(showPasswordForm){
      setShowPasswordForm(false)
    } else {
      setShowPasswordForm(true)
    }
  }
  return (
    <form>

      <div class="page">
        <h3>Update Profile </h3>

        <TextField
          id="firstname"
          label="First Name"
          placeholder={props.userSessionData.firstname}
          helperText="Leave blank if you do not wish to change"
        />

        <TextField
          id="lastname"
          label="Last Name"
          placeholder={props.userSessionData.lastname}
          helperText="Leave blank if you do not wish to change"
        />
        

        <TextField
          label="Email"
          disabled
          value={props.userSessionData.email}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button variant="outlined" color="primary">
          <Typography >Update Profile</Typography>
        </Button>
        <br></br>
        <Button variant="outlined"
        onClick={handleShowPasswordForm}>
          Change Password
        </Button>
        <Collapse in={showPasswordForm}>
          <ChangePassword />
        </Collapse>
       
      </div>
    </form>
  );
};

export default UpdateProfile;
