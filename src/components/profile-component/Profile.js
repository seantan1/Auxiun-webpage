import React from "react";
import "./css/profile.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
 import Gravatar from "react-gravatar";
import FileCopyIcon from '@material-ui/icons/FileCopy';
 
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    textDecoration: "none",
  },
  input: {
    display: "none",
  },

  chip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "5em",
    border: 0,
    color: "white",
    height: 28,
    padding: "0 10px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
    fontSize: 10,
  },
})(Button);

const Profile = () => {
  const classes = useStyles();

  return (
    <div>
      <div className="profile-banner profile-text">
        <div className="profile-banner-background"></div>

        {/* user email goes in email */}
        <Gravatar email="" size={100} rounded />
        <button className="edit-btn">Edit Profile</button>

        <div className="user-title">[Username]</div>

{/* need to style copy icon */}
        <div className="wallet-title">[Wallet Address] <button className="copy-icon"> <FileCopyIcon fontSize="small"/></button></div> 
 
        <div className="email-title">[EMAIL]</div>

        <div className="link-btn">
          Link the following platforms to your profile
          <br />
          <button className="game-icon">
            {" "}
            <i className="steam icon"></i>
          </button>
          <button className="game-icon">
            {" "}
            <i className="steam icon"></i>
          </button>
        </div>
      </div>

      <Container className="bottom-list">
        <Typography variant="overline" display="block" gutterBottom>
          <p className="">
            You have reached the bottom of the list
            <br />
            Nothing here yet! Check our <strong>new drops</strong> or explore
            <br /> more options <strong>marketplace page</strong>
          </p>
        </Typography>
        <div className="banner-text">
          <StyledButton>
            <a className="banner-text" href="/marketplace">
              Explore Marketplace
            </a>
          </StyledButton>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
