import { useState } from "react";
import "./css/Login.css";

import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect, useHistory } from "react-router-dom";

const axios = require("axios");



const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        marginTop: theme.spacing(13),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props) => {
    // login form
    const history = useHistory();
    const [userEmailLoginForm, setuserEmailLoginForm] = useState("");
    const [userPasswordLoginForm, setUserPasswordLoginForm] = useState("");

    // event handler for username
    const userEmailLoginFormHandler = (event) => {
        setuserEmailLoginForm(event.target.value);
    };
    // event handler for password
    const userPasswordLoginFormHandler = (event) => {
        setUserPasswordLoginForm(event.target.value);
    };

    const login = () => {
        axios.post(process.env.REACT_APP_DATABASE_API_LOGIN_URL, {
            apikey: process.env.REACT_APP_DATABASE_API_KEY,
            email: String(userEmailLoginForm),
            password_hash: String(userPasswordLoginForm),
        })
            .then(function (data) {
                if (data.data.status === "fail") {
                    console.log("Email or password is incorrect");
                    props.showAlert("Incorrect Details", "Your Username or Password is incorrect", "", "error");
                } else if (data.data.status === "success") {
                    props.showAlert("Success", "Login Successful!", "", "success");
                    // store session to localStorage
                    localStorage.setItem('userSessionData', JSON.stringify(data.data.data));
                    history.push("/");
                } else {
                    console.log("Unknown error occured. Please try again.");
                    props.showAlert("Unknown", "An Unknown Error has Occured, Please Try Again", "", "error");
                }
            });
    };
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Email"
                        label="Email"
                        autoComplete="email"
                        autoFocus
                        onChange={userEmailLoginFormHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={userPasswordLoginFormHandler}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
};

export default Login;
