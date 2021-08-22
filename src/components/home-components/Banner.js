import "./css/Banner.css";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import { useDencrypt } from "use-dencrypt-effect";

// Animated Text
const values = ["gamer", "content creator", "artist"];
const options = {
  chars: ["_"],
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: "5em",
    textDecoration: "none",
  },
  input: {
    display: "none",
  },
}));

// Explore Marketplace Button
const StyledButton = withStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: "5em",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

const Banner = () => {
  const classes = useStyles();

  // Animated text
  const { result, dencrypt } = useDencrypt(options);
  React.useEffect(() => {
    let i = 0;
    const action = setInterval(() => {
      dencrypt(values[i]);
      i = i === values.length - 1 ? 0 : i + 1;
    }, 2000);

    return () => clearInterval(action);
  }, []);

  return (
    <div className="banner">
      {/* <div class="waveWrapper waveAnimation">
        <div className="banner">
          <div class="waveWrapperInner bgTop">
            <div class="wave waveTop"></div>
          </div>
          <div class="waveWrapperInner bgMiddle">
            <div class="wave waveMiddle"></div>
          </div>
          <div class="waveWrapperInner bgBottom">
            <div class="wave waveBottom"></div>
          </div> */}
          <div className="banner-text">
            <Container maxWidth="sm">
              <div className="homepage-title">
                <Typography variant="h4" component="h4">
                  NFT Marketplace for Gamers and Creators
                </Typography>
              </div>
              <br />
              <div className="homepage-caption">
                <Typography variant="caption" display="block" gutterBottom>
                  Are you a passionate {result}? Check out our Marketplace!
                </Typography>
              </div>
              <a href="/marketplace" class="btn">
                <svg width="577" height="62">
                  <defs>
                    <linearGradient id="grad1">
                      <stop offset="100%" stop-color="#000000" />
                      <stop offset="100%" stop-color="#000000" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="5"
                    y="5"
                    rx="25"
                    fill="none"
                    stroke="url(#grad1)"
                    width="266"
                    height="50"
                  ></rect>
                </svg>
                <span>Explore Marketplace</span>
              </a>
            </Container>
            </div>
         {/* </div> */}
      {/* </div>  */}
    </div>

  );
};

export default Banner;
