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
          {/* <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            <a href="/marketplace">Explore Marketplace</a>
          </Button> */}
          <StyledButton>
            <a href="/marketplace">Explore Marketplace</a>
          </StyledButton>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
