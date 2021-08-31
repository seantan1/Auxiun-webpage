import { useState, useEffect } from "react";
import "./css/updateProfile.css";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const UpdateProfile = (props) => {
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

        <a>Change Password</a>
        <button>Update Profile</button>
      </div>
    </form>
  );
};

export default UpdateProfile;
