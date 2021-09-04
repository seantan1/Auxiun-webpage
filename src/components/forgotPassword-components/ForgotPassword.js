import './css/ForgotPassword.css';

import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { Button, Icon } from '@material-ui/core';
import { useState, useContext } from 'react';
import darkThemeContext from "../darkThemeContext";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

export default function ForgotPassword(props) {
    const { darkTheme } = useContext(darkThemeContext);

    const useStyles = makeStyles((theme) => ({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
                width: "25ch",
            },
            button: {
                margin: theme.spacing(1),
            },
        },
        textFieldStyleRoot: props => ({
            color: props.darkTheme === true ? '#EBEBEB' : "blue",

            "&:hover": {
                color: props.darkTheme === true ? '#EBEBEB' : "blue"
            },

            "&.MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: props.darkTheme === true ? '#EBEBEB' : "#b3b3b3"
                },
                "&:hover fieldset": {
                    borderColor: props.darkTheme === true ? '#EBEBEB' : "blue"
                },
                "&.Mui-focused fieldset": {
                    borderColor: props.darkTheme === true ? '#EBEBEB' : "blue"
                }
            }
        }),

        textFieldLabel: props => ({
            color: props.darkTheme === true ? 'gray' : "#b3b3b3",
            // "&:hover": {
            //     color: props.darkTheme === true ? '#EBEBEB' : "blue"
            // },
            "&$textFieldLabelFocused": {
                color: props.darkTheme === true ? '#EBEBEB' : "blue"
            },
        }),

        textFieldLabelFocused: () => ({}),

    }));

    // // CssTextField
    // const CssTextField = withStyles({
    //     root: {
    //         "& input": {
    //             color: darkTheme === true ? '#EBEBEB' : "blue"
    //         },
    //         "& label": {
    //             color: darkTheme === true ? 'gray' : "#b3b3b3"
    //         },
    //         "&:hover label": {
    //             color: darkTheme === true ? '#EBEBEB' : "blue"
    //         },
    //         "& label.Mui-focused": {
    //             color: darkTheme === true ? '#EBEBEB' : "blue"
    //         },
    //         "& .MuiOutlinedInput-root": {
    //             "& fieldset": {
    //                 borderColor: darkTheme === true ? '#EBEBEB' : "#b3b3b3"
    //             },
    //             "&:hover fieldset": {
    //                 borderColor: darkTheme === true ? '#EBEBEB' : "blue"
    //             },
    //             "&.Mui-focused fieldset": {
    //                 borderColor: darkTheme === true ? '#EBEBEB' : "blue"
    //             }
    //         }
    //     },
    // })(TextField);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onPasswordUpdate = (event) => {
        setPassword(event.target.value);
    }

    const onConfirmPasswordUpdate = (event) => {
        setConfirmPassword(event.target.value);
    }

    const submitHandler = () => {
        if (password !== confirmPassword) {
            props.showAlert("Passwords do not match", "The two passwords do not match", "", "error");
        } else {
            //change password code
        }
    }

    // For the dark theme props (to be passed in useStyles)
    const darkThemeProps = { darkTheme: darkTheme }

    const classes = useStyles(darkThemeProps);

    return (
        <div className="forgotPassword-page">
            <div className="fp-content">
                <h1 className="title-text">Password Reset</h1>
                <TextField
                    InputProps={{
                        classes: {
                            root: classes.textFieldStyleRoot
                        }
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.textFieldLabel,
                            focused: classes.textFieldLabelFocused
                        }
                    }}
                    className="text-field"
                    style={{ width: '300px' }}
                    label="Email"
                    required
                    variant="outlined"
                />
                <br></br><br></br>
                <TextField
                    InputProps={{
                        classes: {
                            root: classes.textFieldStyleRoot
                        }
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.textFieldLabel,
                            focused: classes.textFieldLabelFocused
                        }
                    }}
                    className="text-field"
                    style={{ width: '300px' }}
                    label="New Password"
                    required
                    type="password"
                    variant="outlined"
                    onChange={onPasswordUpdate}
                />
                <br></br><br></br>
                <TextField
                    InputProps={{
                        classes: {
                            root: classes.textFieldStyleRoot
                        }
                    }}
                    InputLabelProps={{
                        classes: {
                            root: classes.textFieldLabel,
                            focused: classes.textFieldLabelFocused
                        }
                    }}
                    className="text-field"
                    style={{ width: '300px' }}
                    label="Confirm New Password"
                    required type="password"
                    variant="outlined"
                    onChange={onConfirmPasswordUpdate}
                />
                <br></br><br></br>
                <Link to={{
                    pathname: "/login",
                }}>
                    <span>Return to Login</span> <br /><br />
                </Link>
                <Button id="change-password-button" variant="contained" required color="primary" onClick={submitHandler}>Change Password</Button>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}