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
    const [mintGameId, setMintGameId] = useState("");
    const [mintItemId, setMintItemId] = useState("");

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

    const receiverAddressHandler = (event) => {
        setReceiverAddress(event.target.value);
    };

    const mintGameIdHandler = (event) => {
        setMintGameId(event.target.value);
    };

    const mintItemIdHandler = (event) => {
        setMintItemId(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [gamesList, setGamesList] = useState();
    const [nftMetadatasList, setNftMetadatasList] = useState();

    // get gamesList
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_DATABASE_API_GAME_URL)
            .then(function (data) {
                setGamesList(data.data.data);
            });
    }, []);

    // get nftMetadatasList for specific gameId
    useEffect(() => {
        if (mintGameId !== "") {
            axios.get(process.env.REACT_APP_DATABASE_API_FETCH_NFT_BY_GAME_ID_URL + mintGameId)
                .then(function (data) {
                    setNftMetadatasList(data.data);
                })
        }

    }, [mintGameId])

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
    const createGameItem = (gameId, itemId, itemName, itemDescription, itemImage) => {
        const formData = new FormData();
        formData.append('apikey', process.env.REACT_APP_DATABASE_API_KEY);
        formData.append('game_id', String(gameId));
        formData.append('item_id', String(itemId));
        formData.append('item_name', String(itemName));
        formData.append('item_description', String(itemDescription));
        formData.append('item_image', itemImage);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(process.env.REACT_APP_DATABASE_API_NFT_URL, formData, config)
        .then(function (data) {
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
        })
        .catch((error) => {
            props.showAlert("Error", "An unknown error occurred when attempting to do POST request.", "", "error");
        });
        
    };

    // only admin adresses can call this
    const mintNFT = (_receiverAddress, gameId, itemId) => {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(
            TOKEN_CONTRACT_ABI,
            TOKEN_CONTRACT_ADDRESS
        );
        contract.methods
            .mint(_receiverAddress, gameId, itemId)
            .send({
                from: props.account,
            })
            .then(function (result) {
                props.showAlert(
                    "Success",
                    "NFT has been successfully minted",
                    "",
                    "success"
                );
            });
    };

    // source: https://stackoverflow.com/questions/46040973/how-to-upload-image-using-reactjs-and-save-into-local-storage
    const imageUpload = (e) => {
        const file = e.target.files[0];
        setAddItemImage(file);
        // getBase64(file).then(img => {
        //     setAddItemImage(img);
        // });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

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
                                    type="file"
                                    id="imageFile"
                                    name='imageFile'
                                    onChange={imageUpload} />
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
                                    value={mintGameId}
                                    required
                                    onChange={mintGameIdHandler}
                                >
                                    {gamesList &&
                                        gamesList.map((option) => (
                                            <MenuItem key={option.value} value={option._id}>
                                                {option._id} - {option.game_name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                                <TextField
                                    required
                                    select
                                    id="item-id"
                                    label="Select Game Item"
                                    className="margin-rght"
                                    variant="outlined"
                                    value={mintItemId}
                                    onChange={mintItemIdHandler}
                                    required
                                >
                                    {nftMetadatasList &&
                                        nftMetadatasList.map((option) => (
                                            <MenuItem key={option.item_id} value={option.item_id}>
                                                {option.item_id} - {option.item_name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                                <br></br>
                                <TextField
                                    required
                                    id="wallet-address"
                                    label="Wallet Address"
                                    className="margin-rght"
                                    value={receiverAddress}
                                    onChange={receiverAddressHandler}
                                    required
                                />
                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => {
                                        mintNFT(receiverAddress, mintGameId, mintItemId)
                                    }}
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
