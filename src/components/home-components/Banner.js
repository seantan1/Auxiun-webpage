import "./css/Banner.css";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

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
              Are you a passionate gamer? Check out our Marketplace!
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
