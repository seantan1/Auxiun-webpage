// import { useState } from "react";
// import './css/Login.css';

// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { withStyles } from "@material-ui/core/styles";
// import Alert from '@material-ui/lab/Alert';
// const axios = require('axios');

// // CssTextField
// const CssTextField = withStyles({
//     root: {
//         "& input": {
//             color: "blue"
//         },
//         "& label": {
//             color: "#b3b3b3"
//         },
//         "&:hover label": {
//             color: "blue"
//         },
//         "& label.Mui-focused": {
//             color: "blue"
//         },
//         "& .MuiOutlinedInput-root": {
//             "& fieldset": {
//                 borderColor: "#b3b3b3"
//             },
//             "&:hover fieldset": {
//                 borderColor: "blue"
//             },
//             "&.Mui-focused fieldset": {
//                 borderColor: "blue"
//             }
//         }
//     }
// })(TextField);

// const Login = (props) => {

//     // login form
//     const [userEmailLoginForm, setuserEmailLoginForm] = useState('');
//     const [userPasswordLoginForm, setUserPasswordLoginForm] = useState('');

//     // event handler for username
//     const userEmailLoginFormHandler = (event) => {
//         setuserEmailLoginForm(event.target.value);
//     }
//     // event handler for password
//     const userPasswordLoginFormHandler = (event) => {
//         setUserPasswordLoginForm(event.target.value);
//     }

//     const login = () => {
//         axios.post(process.env.REACT_APP_API_USER_LOGIN_URL, {
//             apikey: process.env.REACT_APP_PRIVATE_API_KEY,
//             email: String(userEmailLoginForm),
//             password_hash: String(userPasswordLoginForm)
//         }).then(function (data) {
//             if (data.data.message === "fail") {
//                 console.log("Username or password is incorrect");
//                 // TODO: set alert using props from App.js
//             }
//             else if (data.data.message === "success") {
//                 console.log("Login successful!");
//                 // TODO: set alert using props from App.js, set authenticated useStates from App.js
//                 // setUserId(data.data.data[0]._id);
//                 // setUserUsername(data.data.data[0].username);
//                 // setAuthenticated(true);
//             }
//             else {
//                 console.log("Unknown error occured. Please try again.");
//                 // TODO: set alert using props from App.js
//             }
//         })
//     }

//     return (
//         <div>
//             <div className="login-container">
//                 <h1 className="title-text">Login</h1>
//                 <p className="title-text">Enter your streamer credentials</p>
//                 <CssTextField className="text-field" label="Username" variant="outlined" onChange={userEmailLoginFormHandler} /><br></br><br></br>
//                 <CssTextField className="text-field" label="Password" type="password" variant="outlined" onChange={userPasswordLoginFormHandler} /><br></br><br></br>
//                 <Button id="donate-button" variant="contained" color="primary" onClick={login}>Login</Button>
//                 <br></br>
//                 <br></br>
//             </div>
//         </div>
//     );
// }

// export default Login;

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
                if (data.data.message === "fail") {
                    console.log("Email or password is incorrect");
                    props.showAlert("Incorrect Details", "Your Username or Password is incorrect", "", "error");
                } else if (data.data.message === "success") {
                    console.log("Login successful!");
                    props.showAlert("Success", "Login Successful!", "", "success");
                    // TODO: set alert using props from App.js, set authenticated useStates from App.js
                    // setUserId(data.data.data[0]._id);
                    // setUserUsername(data.data.data[0].username);
                    // setAuthenticated(true);
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
                            <Link href="#" variant="body2">
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
