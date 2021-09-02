import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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

    editButton: {
        // color: "green",
        fontSize: 15,
    },

    smallText: {
        fontSize: 15,
    },

    mediumText: {
        padding: 1,
        fontSize: 18,
    },

    largeText: {
        padding: 1,
        fontSize: 36,
    },

    container: {
        padding: "2%"
    },

    profileImage: {
        margin: "2%",
        border: "1px solid white",
        boxShadow: '0px 2px 15px 6px rgba(48, 48, 48, 0.4)'
    },

    boxShadowContainerLightMode: {
        margin: "auto",
        width: "60%",
        border: "1px solid rgba(64, 64, 64, 0.5)",
        borderRadius: 10,
        boxShadow: '0px 2px 16px 3px rgba(64, 64, 64, 0.2)',
        paddingTop: "4%",
        paddingBottom: "4%",
        backgroundColor: "rgba(247, 247, 247, 0.4)"
    },

    boxShadowContainerDarkMode: {
        margin: "auto",
        width: "60%",
        border: "1px solid rgba(219, 219, 219, 0.5)",
        borderRadius: 10,
        boxShadow: '0px 2px 16px 3px rgba(219, 219, 219, 0.2)',
        paddingTop: "4%",
        paddingBottom: "4%",
        backgroundColor: "rgba(60,60,60, 0.4)",
    },
    
    center: {
        display: "flex",
        justifyContent: "space-around"
    }


}));