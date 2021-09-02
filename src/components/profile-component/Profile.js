import { useState, useEffect } from "react";
import "./css/profile.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Gravatar from "react-gravatar";
 import {useStyles} from "./ProfileStyle"

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
                    <Typography className={classes.mediumText}>[Wallet Address]</Typography>
                    <Typography className={classes.mediumText}>{props.userSessionData.email}</Typography>
                </div>
                <a href="/updateprofile"> 
                    <Button variant="outlined" className={classes.editButton}>Edit Profile</Button>
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
