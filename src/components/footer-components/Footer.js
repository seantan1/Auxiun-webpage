import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
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

import "./css/Footer.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Capstone NFT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
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

  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(40),
    paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const footers = [
  {
    title: "PRODUCTS",
    description: ["Platform", "Wallet", "Marketplace"],
  },
  {
    title: "SOLUTIONS",
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
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <hr />
        {/* NEED TO ALIGN SUBSCRIBE BTN PROPERLY */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Typography variant="h6">Stay Up To Date</Typography>
            <Typography variant="caption">
              Don't miss the latest news, guides and insights.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              helperText="We will never share your email with anyone else"
            />

            <Button
              className="subscribe-btn"
              variant="contained"
              color="primary"
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>

        <hr />
        <div className="social-media-icons">
          <a href="">
            <FacebookIcon />
          </a>
          <a href="">
            <LinkedInIcon />
          </a>
          <a href="">
            <YouTubeIcon />
          </a>
          <a href="">
            <TwitterIcon />
          </a>
          <a href="">
            <InstagramIcon />
          </a>
          <a href="">
            <TelegramIcon />
          </a>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}
