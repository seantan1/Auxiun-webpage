import { useState, useEffect } from "react";
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

// web3 and axios for NFT data & metadata
import Web3 from "web3";
// contract data
import {
  TOKEN_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
} from "../../contract-data/token-contract-data";

const axios = require("axios");

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

export default function CreateTokens(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [platform, setPlatform] = useState("");
  const [currency, setCurrency] = useState("EUR");

  //   Game
  const [addGameForm, setAddGameForm] = useState("");

  //   Item
  const [addItemGameId, setAddItemGameId] = useState("");
  const [addItemId, setAddItemId] = useState("");
  const [addItemName, setAddItemName] = useState("");
  const [addItemDescription, setAddItemDescription] = useState("");
  const [addItemImage, setAddItemImage] = useState("");

  // Mint Token
  // .mint(receiverAddress, gameId, itemId)
  const [receiverAddress, setReceiverAddress] = useState("");
  const [mintGame, setMintGame] = useState("");
  const [mintItem, setMintItem] = useState("");
 
  const addGameFormHandler = (event) => {
    setAddGameForm(event.target.value);
  };

  const addItemGameIdHandler = (event) => {
    setAddItemGameId(event.target.value);
  };


  const addItemIdHandler = (event) => {
    setAddItemId(event.target.value);
  };

  const addItemNameHandler = (event) => {
    setAddItemName(event.target.value);
  };

  const addItemDescriptionHandler = (event) => {
    setAddItemDescription(event.target.value);
  };

  const AddItemImageHandler = (event) => {
    setAddItemImage(event.target.value);
    console.log(addItemImage);
  };


  const receiverAddressHandler = (event) => {
    setReceiverAddress(event.target.value);
  };

  const mintGameHandler = (event) => {
    setMintGame(event.target.value);
  };

  const mintItemHandler = (event) => {
    setMintItem(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [gamesList, setGamesList] = useState();

  // get gamesList
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DATABASE_API_GAME_URL)
      .then(function (data) {
        setGamesList(data.data.data);
      });
  }, []);

  const createGame = (gameName) => {
    axios
      .post(process.env.REACT_APP_DATABASE_API_GAME_URL, {
        apikey: process.env.REACT_APP_DATABASE_API_KEY,
        game_name: String(gameName),
      })
      .then(function (data) {
        if (data.data.errors) {
          props.showAlert("Error", "An unknown error occurred.", "", "error");
        } else if (data.status === 200) {
          props.showAlert(
            "Success",
            "Game has been successfully created",
            "",
            "success"
          );
        }
      });
  };

  // create game item AKA create NFT Metadata
  // DEV NOTE: itemImage variable here is the file for upload, not sure if it will work as is, on Postman is saves as variable type "File"
  const createGameItem = (
    gameId,
    itemId,
    itemName,
    itemDescription,
    itemImage
  ) => {
    axios
      .post(process.env.REACT_APP_DATABASE_API_NFT_URL, {
        apikey: process.env.REACT_APP_DATABASE_API_KEY,
        game_id: String(gameId),
        item_id: String(itemId),
        item_name: String(itemName),
        item_description: String(itemDescription),
        item_image: itemImage,
      })
      .then(function (data) {
          console.log(data);
        if (data.data.errors) {
          props.showAlert("Error", "An unknown error occurred.", "", "error");
        } else if (data.status === 200) {
          props.showAlert(
            "Success",
            "Game item has been successfully created",
            "",
            "success"
          );
        }
      });
  };

  // only admin adresses can call this
  const mintNFT = (receiverAddress, gameId, itemId) => {
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
      TOKEN_CONTRACT_ABI,
      TOKEN_CONTRACT_ADDRESS
    );
    contract.methods
      .mint(receiverAddress, gameId, itemId)
      .send({
        from: props.account,
      })
      .then(function (result) {
        console.log(result);
        // TODO: add explorer tx link
        props.showAlert(
          "Success",
          "NFT has been successfully minted",
          "",
          "success"
        );
      });
  };

  return (
    <div>
      <div className="token-banner">
        <div className="token-banner-background"></div>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Add Game" {...a11yProps(0)} />
              <Tab label="Add Item" {...a11yProps(1)} />
              <Tab label="Mint Token" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <h4 className="token-title">Add A New Game</h4>

            <div className="form-align">
              <h4></h4>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="game-name"
                  label="Game Name"
                  value={addGameForm}
                  onChange={addGameFormHandler}
                  required
                />
                <br /> <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  startIcon={<AddIcon />}
                  onClick={() => {
                    createGame(addGameForm)
                  }}
                >
                  Add Game
                </Button>
              </form>
            </div>
          </TabPanel>

          {/* ADD A NEW ITEM */}
          <TabPanel value={value} index={1}>
            <h4 className="token-title">Add A New Item</h4>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="select-game"
                select
                label="Game ID"
                value={addItemGameId}
                onChange={addItemGameIdHandler}
                variant="outlined"
                required
              >
                {gamesList &&
                  gamesList.map((option) => (
                    <MenuItem key={option.value} value={option._id}>
                      {option._id} - {option.game_name}
                    </MenuItem>
                  ))}
              </TextField>
              <br />
              <TextField
                required
                id="item-id"
                label="Item ID"
                type="text"
                value={addItemId}
                onChange={addItemIdHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                id="item-name"
                label="Item Name"
                type="text"
                value={addItemName}
                onChange={addItemNameHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br /> <br />
              <TextField
                id="item-description"
                className="item-description"
                label="Item Description"
                placeholder="Item Description"
                multiline
                variant="filled"
                value={addItemDescription}
                onChange={addItemDescriptionHandler}
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
                  onChange={AddItemImageHandler}
                />
              </div>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                startIcon={<CloudUploadIcon />}
                onClick={() => {
                    createGameItem(addItemGameId, addItemId, addItemName, addItemDescription, addItemImage);
                }}
              >
                Create Game Item
              </Button>
            </form>
          </TabPanel>

          {/* Mint NFT tokens */}
          <TabPanel value={value} index={2}>
            <h4 className="token-title">Mint NFTs to Wallet</h4>

            <div className="form-align">
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="game-id"
                  select
                  label="Select Game"
                  variant="outlined"
                  value={mintGame}
                  required
                  onChange={mintGameHandler}
                >
                  {gamesList &&
                    gamesList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option._id} - {option.game_name}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  required
                  select
                  id="item-id"
                  label="Select Game Item"
                  className="margin-rght"
                  variant="outlined"
                  onChange={mintItemHandler}
                  required
                />
                <br /> <br />
                <TextField
                  required
                  id="wallet-address"
                  label="Wallet Address"
                  className="margin-rght"
                  onChange={receiverAddressHandler}
                  required
                />
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={mintNFT}
                  startIcon={<SendIcon />}
                >
                  Mint Token
                </Button>
              </form>
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
