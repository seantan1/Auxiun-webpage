import { useState, useEffect } from "react";
import "./css/profile.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Gravatar from "react-gravatar";
import {useStyles} from "./styles/ProfileStyles"
import { NavLink } from "react-router-dom";
const StyledButton = withStyles({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: "5em",
        border: 0,
        color: "white",
        paddingLeft: 20,
        paddingRight:20,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    label: {
        fontSize: 16,
    },
})(Button);

const Profile = (props) => {
    const classes = useStyles();

    return (
        <div>
            <div className="profile-banner profile-text">
                <div className="profile-banner-background"></div>
                <div className={classes.boxShadowContainerLightMode}>
                {/* For dark mode */}
                {/* <div className={ darkMode ? classes.boxShadowContainerDarkMode : classes.boxShadowContainerLightMode }> */}
                <Gravatar 
                    email={props.userSessionData.email} 
                    className={classes.profileImage}
                    size={100} 
                    rounded
                />
               
                <div className="user-title">{props.userSessionData.firstname} {props.userSessionData.lastname}</div>
                <div className={classes.container}>
                    <Typography className={classes.smallText}>[Wallet Address]</Typography>
                    <br></br>
                    <Typography className={classes.smallText}>{props.userSessionData.email}</Typography>
                </div>
                <a href="/updateprofile"> 
                    <Button 
                        variant="contained" 
                        className={classes.editButton}
                        color="primary"
                        >
                        Edit Profile
                    </Button>
                </a>
                <div className="link-btn">
                    <Typography className={classes.smallText}>Link the following platforms to your profile</Typography>
                    <br />
                    <Button className="game-icon">
                        <Typography style={{fontSize: 30}}>
                        <i className="steam icon"></i>
                        </Typography>
                    </Button>
                    <Button className="game-icon">
                        <Typography style={{fontSize: 30}}>
                        <i className="steam icon"></i>
                        </Typography>
                    </Button>
                </div>
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
                    <NavLink to="/marketplace">
                        <StyledButton>
                            {/* <Typography> */}
                            Marketplace
                            {/* </Typography> */}
                        </StyledButton>
                    </NavLink>
                    
                </div>
            </Container>
        </div>
    );
};

export default Profile;
