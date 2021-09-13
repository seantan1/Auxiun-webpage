import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    center: {
        display: "flex",
        justifyContent: "space-around"
    },
    borderedContainerLight: {
        border: "1px solid #b5b5b5",
        boxShadow: '0px 2px 16px 3px rgba(64, 64, 64, 0.2)',
        boxSizing: "border-box",
        width: "100%",
        maxWidth:" 480px",
        margin: "auto",
        padding: "4rem",
        display: "grid",
        gridGap: "30px",
        borderRadius: 10,
        backgroundColor: "rgba(247, 247, 247, 0.5)",
    },

    borderedContainerDark: {
        border: "1px solid rgba(219, 219, 219, 0.8)",
        boxShadow: '0px 2px 16px 3px rgba(219, 219, 219, 0.2)',
        boxSizing: "border-box",
        width: "100%",
        maxWidth:" 480px",
        margin: "auto",
        padding: "4rem",
        display: "grid",
        gridGap: "30px",
        borderRadius: 10,
        backgroundColor: "rgba(60,60,60, 0.4)",
    },

    userDetails: {
        width: "100%",
        paddingTop: 20,
    },

    mediumText: {
        fontSize: 18,
    },

    textFieldStyleRoot: props => ({
        color: props.darkTheme === true ? '#EBEBEB' : "#404040",
        '&.MuiInput-underline:before': {
            borderBottomColor: props.darkTheme ? '#e8e8e8': "#404040", // Semi-transparent underline
        },
        '&.MuiInput-underline:hover:before': {
            borderBottomColor: props.darkTheme ? '#ededed': "#1e69b0", // Solid underline on hover
        },
        '&.MuiInput-underline:after': {
            borderBottomColor: props.darkTheme ? 'white': "#1e69b0", // Solid underline on focus
        },
        "&:hover": {
            color: props.darkTheme === true ? '#EBEBEB' : "#404040"
        },
    }),

    textFieldLabel: props => ({
        color: props.darkTheme === true ? 'gray' : "#b3b3b3",
        "&$textFieldLabelFocused": {
            color: props.darkTheme === true ? '#EBEBEB' : "#1e69b0"
        },
    }),
    
    textFieldLabelFocused: () => ({}),

    textFieldFilledStyleRoot: props => ({
        color: props.darkTheme === true ? '#EBEBEB' : "#404040",
        
        '&.MuiFilledInput-underline:before': {
            borderBottomColor: props.darkTheme ? '#e8e8e8': "#404040", // Semi-transparent underline
        },
        '&.MuiFilledInput-underline:hover:before': {
            borderBottomColor: props.darkTheme ? '#ededed': "#1e69b0", // Solid underline on hover
        },
        '&.MuiFilledInput-underline:after': {
            borderBottomColor: props.darkTheme ? 'white': "#1e69b0", // Solid underline on focus
        },
        "&:hover": {
            color: props.darkTheme === true ? '#EBEBEB' : "#404040"
        },
    }),

    labelStyle: props => ({
        borderRadius: 4,
        padding: 6,
        fontSize: 13,
        color: props.darkTheme ? "white":"#1e69b0",
        backgroundColor: props.darkTheme ? "#616161": "#e0e0e0"
    })
    
}))
