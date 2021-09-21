import { useState, useEffect, useContext } from "react";
// import "./css/profile.css";
import "./styles/profile.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Gravatar from "react-gravatar";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import darkThemeContext from "../darkThemeContext";
import { useStyles } from "./styles/ProfileStyles"
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const StyledButton = withStyles({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: "5em",
        border: 0,
        color: "white",
        paddingLeft: 20,
        paddingRight: 20,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    label: {
        fontSize: 16,
    },
})(Button);

const Profile = (props) => {
    const classes = useStyles();
    const { darkTheme } = useContext(darkThemeContext);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div>
                <div className="profile-banner profile-text">
                    <div className="profile-banner-background"></div>
                    <div className={darkTheme ? classes.boxShadowContainerDarkMode : classes.boxShadowContainerLightMode}>
                        <Gravatar
                            email={props.userSessionData.email}
                            className={classes.profileImage}
                            size={100}
                            rounded
                        />

                        <div className="user-title" style={{ color: darkTheme ? 'aliceblue' : 'black' }} > {props.userSessionData.firstname} {props.userSessionData.lastname}</div>
                        <div className={classes.container}>
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
                                <Typography style={{ fontSize: 30 }}>
                                    <i className="steam icon"></i>
                                </Typography>
                            </Button>
                            <Button className="game-icon">
                                <Typography style={{ fontSize: 30 }}>
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
        </motion.div>
    );
};

export default Profile;
