import "./css/Team.css";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     justifyContent: "center",

//     "& > *": {
//       borderRadius: "5em",
//       border: 0,
//       color: "white",
//       height: 48,
//       padding: "0 30px",
//       boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//       margin: theme.spacing(1),
//       textAlign: "center",
//       align: "center",
//     },
//   },
// }));
const useStyles = makeStyles({
  root: {
    // display: "flex",

    flexGrow: 1,
    justifyContent: "center",
    maxWidth: 255,
  },
  media: {
    height: 140,
  },
});

const Team = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="banner banner-text">
        <h3>This is team page</h3>
        <div className="banner-text">
          <Grid container spacing={25}>
            <Grid item md={4}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="http://auxiun.com/vvv.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="h5"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Grid>
            <Grid item md={4}>
              <h3>Test</h3>
            </Grid>
            <Grid item md={4}>
              <h3>Test</h3>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Team;
