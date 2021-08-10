import React from "react";
import "./css/CreateTokens.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

// sample data
const gamePlatforms = [
  {
    value: "1",
    label: "Fortnite",
  },
  {
    value: "2",
    label: "CSGO",
  },
];

const sampleProductData = [
  {
    value: "1",
    label: "Knife",
  },
  {
    value: "2",
    label: "Pickaxe",
  },
];

export default function CreateTokens() {
  const classes = useStyles();
  const [gamePlatform, setGamePlatform] = React.useState("");
  const handleChange = (event) => {
    setGamePlatform(event.target.value);
  };

  return (
    <div>
      <div className="token-banner">
        <div className="token-banner-background"></div>

        <div className="form-align">
          <h4></h4>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                required
                id="game-id"
                label="Game Platform"
                select
                onChange={handleChange}
                helperText="Please select which gaming platform"
              >
                {gamePlatforms.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                label="Product"
                //   value={currency}
                onChange={handleChange}
                helperText="Please select which item to add"
              >
                {sampleProductData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-number"
                label="Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="ether-price"
                label="Ether Price"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <div className={classes.root}>
                  <span className="upload-title">Upload Image </span>
                <label htmlFor="contained-button-file"></label>
                <input
                  variant="contained"
                  color="primary"
                  component="span"
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                />
              </div>
            </div>
            <button className="create-btn">Create NFT</button>
          </form>
        </div>
      </div>
    </div>
  );
}
