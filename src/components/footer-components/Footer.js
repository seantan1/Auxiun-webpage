import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import darkThemeContext from "../darkThemeContext";
import { withStyles } from "@material-ui/core/styles";

//image imports
import background from "../../assets/background.png";
import backgroundDark from "../../assets/background_dark.png";

import "./css/Footer.css";

function Copyright() {
  const { darkTheme } = useContext(darkThemeContext);
  return (
    <Typography
      variant="body2"
      style={{ color: darkTheme ? "aliciablue" : "#AAAAAA" }}
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Capstone NFT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Products",
    description: ["Platform", "Wallet", "Marketplace"],
  },
  {
    title: "Solutions",
    description: ["Gaming", "Cryptocurrency", "Software", "Developer"],
  },
  {
    title: "Resources",
    description: ["Blog", "Documentation", "Roadmap", "Timeline"],
  },
  {
    title: "About",
    description: ["Why Us?", "Company", "Team", "Careers", "Contact Us"],
  },
];

export default function Pricing() {
  const { darkTheme } = useContext(darkThemeContext);
  const useStyles = makeStyles((theme) => ({
    "@global": {
      ul: {
        // height: "20vh",
        backgroundColour: "lightblue",
        margin: 0,
        padding: 0,
        listStyle: "none",
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: "wrap",
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },

    helperText: {
      color: darkTheme ? "aliciablue" : "#AAAAAA",
    },

    footer: {
      borderTop: darkTheme ? "1px solid white" : "1px solid #AAAAAA",
      // marginTop: theme.spacing(30),
      // height: "10vh",
      [theme.breakpoints.up("sm")]: {
        paddingTop: theme.spacing(6),
      },
    },
  }));

  const classes = useStyles();

  // CssTextField
  const CssTextField = withStyles({
    root: {
      "& input": {
        color: darkTheme === true ? "#EBEBEB" : "blue",
      },
      "& label": {
        color: darkTheme === true ? "#EBEBEB" : "#b3b3b3",
      },
      "&:hover label": {
        color: darkTheme === true ? "#EBEBEB" : "blue",
      },
      "& label.Mui-focused": {
        color: darkTheme === true ? "#EBEBEB" : "blue",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: darkTheme === true ? "#EBEBEB" : "#b3b3b3",
        },
        "&:hover fieldset": {
          borderColor: darkTheme === true ? "#EBEBEB" : "blue",
        },
        "&.Mui-focused fieldset": {
          borderColor: darkTheme === true ? "#EBEBEB" : "blue",
        },
      },
      "& .MuiFormHelperText-root": {
        "&.MuiFormHelperText-contained": {
          color: darkTheme ? "aliceblue" : "",
        },
      },
    },
  })(TextField);

  return (
    <React.Fragment>
      <div className="footer">
        <Container maxWidth="md" component="footer" className={classes.footer}>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        variant="subtitle1"
                        style={{ color: darkTheme ? "aliceblue" : "#AAAAAA" }}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <Typography variant="h6">Stay Up To Date</Typography>
              <Typography variant="caption">
                Don't miss the latest news, guides and insights.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CssTextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                helperText="We will never share your email with anyone else"
              />

              <Button
                className={darkTheme ? "subscribe-btn-dark" : "subscribe-btn"}
                variant="contained"
                color="primary"
              >
                Subscribe
              </Button>
            </Grid>
          </Grid>

          <hr />

          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}
