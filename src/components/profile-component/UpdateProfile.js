import { useState, useEffect } from "react";
import "./css/updateProfile.css";

const UpdateProfile = (props) => {
  return (
    <form>
      <div class="page">
        <h3>Update Profile </h3>

        <label class="field field_v1">
          <input
            class="field__input"
            placeholder={props.userSessionData.firstname}
          />
          <span class="field__label-wrap">
            <span class="field__label">First name</span>
          </span>
        </label>
        <label class="field field_v2">
          <input
            class="field__input"
            placeholder={props.userSessionData.lastname}
          />
          <span class="field__label-wrap">
            <span class="field__label">Last name</span>
          </span>
        </label>
        <label class="field field_v3">
          <input
            class="field__input"
            placeholder={props.userSessionData.email}
          />
          <span class="field__label-wrap">
            <span class="field__label">E-mail</span>
          </span>
        </label>

        <a>Change Password</a>
        <button>Update Profile</button>
      </div>
    </form>
  );
};

export default UpdateProfile;
