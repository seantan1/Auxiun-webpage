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
    }
}))
