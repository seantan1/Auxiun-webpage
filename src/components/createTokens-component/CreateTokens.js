import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import "./css/CreateTokens.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
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

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
export default function CreateTokens() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [platform, setPlatform] = React.useState("");
  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="token-banner">
        <div className="token-banner-background"></div>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Add Game" {...a11yProps(0)} />
              <Tab label="Add Item" {...a11yProps(1)} />
              <Tab label="Transfer Token" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <h4 className="token-title">Add A New Game</h4>

            <div className="form-align">
              <h4></h4>
              <form className={classes.root} noValidate autoComplete="off">
                {/* <TextField
                  id="game-id"
                  type="number"
                  label="Game ID"
                  className="margin-rght"
                  required
                /> */}
                <TextField id="game-name" label="Game Name" required />
                <br /> <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  Add Game
                </Button>
              </form>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <h4 className="token-title">Add A New Item</h4>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                variant="outlined"
                required
              >
                {gamePlatforms.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <TextField
              required
                id="item-id"
                label="Item ID"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
              required
                id="item-name"
                label="Item Name"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              {/* Amount to send */}
              {/* <TextField
                id="item-amount"
                label="Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
              {/* Gas Price */}
              {/* <TextField
                id="ether-price"
                label="Ether Price"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
              <br />
              <TextField
                id="item-description"
                className="product-description"
                label="Item Description"
                placeholder="Item Description"
                multiline
                variant="filled"
              />
              <br />
              <br />

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
              <br />
              <br />

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
              >
                Create Game Item
              </Button>
            </form>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <h4 className="token-title">Transfer Item to Wallet</h4>

            <div className="form-align">
              <h4></h4>
              <form className={classes.root} noValidate autoComplete="off">
                {/* <TextField
                  required
                  select
                  id="game-id"
                  label="Game ID"
                  className="margin-rght"
                  required
                /> */}
                <TextField
                  required
                  select
                  id="game-id"
                  label="Select Game"
                  className="margin-rght"
                  required
                /> 
                <TextField
                  required
                  select
                  id="item-id"
                  label="Select Game Item"
                  className="margin-rght"
                  required
                /> 
                <br /> <br />
                {/* <TextField
                  required
                  id="amount-id"
                  label="Amount"
                  className="margin-rght"
                  required
                /> */}
                <TextField
                  required
                  id="wallet-address"
                  label="Wallet Address"
                  className="margin-rght"
                  required
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SendIcon />}
                >
                  Transfer Token
                </Button>
              </form>
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
