import React, { useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';
import { motion } from 'framer-motion';
import './css/Buy.css'
import {
    withRouter,
    useHistory,
    Redirect
} from "react-router-dom";
// web3 and axios for NFT data & metadata
import Web3 from 'web3';
// contract data
import {
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
} from "../../contract-data/token-contract-data";
import { TextField, Typography } from '@material-ui/core';
import darkThemeContext from "../darkThemeContext";

// axios
const axios = require('axios');

function Buy(props) {
    const { darkTheme } = useContext(darkThemeContext);
    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
        gridContainer: {
            paddingLeft: "4rem",
            paddingRight: "4rem"
        },
        gridItemContainer: {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
        },
        root: {
            marginTop: "2rem",
        },
        details: {
            background: darkTheme ? '#2c2c2c' : "white",
            padding: "1rem",
            borderRadius: "5px",
            width: "100%",
            objectFit: "scale-down",
        },
        fullWidth: {
            width: "100%",
            marginBottom: "1rem"
        }
    }));

    useEffect(() => {
        // console.log(props.location.state.data.data._id);
        // axios increase popularity
        axios.patch(process.env.REACT_APP_DATABASE_API_INCREASE_POPULARITY + props.location.state.data.data._id, {
            apikey: process.env.REACT_APP_DATABASE_API_KEY
        })
            .then(function (data) {
                console.log(data);
            });
    }, [props.location.state.data])

    // function to purchase NFT on market
    // WARNING: you need to fetch the price properly and pass it into the function, if you put a lower amount the transaction will revert,
    // if you put a higher amount the transaction will pass through but the buyer pays more than necessary
    // price parameter should be a string, this function will convert it to ethers
    const purchaseNFTOnMarket = (tokenId, price) => {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
        let amount = web3.utils.toWei(price, 'ether');

        contract.methods.purchaseNFT(tokenId).send({
            from: props.account,
            value: amount
        }).on('transactionHash', (hash) => {
            props.showAlert(`Purchase complete.\n Transaction ID: ${hash}`)
            history.push('/marketplace');
        })
    }

    const onClick = () => {
        purchaseNFTOnMarket(props.location.state.data.token_id, props.location.state.data.price);
    }

    // add nftMetadata to user's watchlist on database
    const addToWatchList = (user_id, nftMetadata_id) => {
        axios.post(process.env.REACT_APP_DATABASE_API_WATCHLISTS, {
            apikey: process.env.REACT_APP_DATABASE_API_KEY,
            user_id: user_id,
            nftMetadata_id: nftMetadata_id
        })
            .then(function (data) {
                props.showAlert("Success", "Item has been added to watchlist", "", "success");
            });
    }

    const classes = useStyles();
    if (!props.location.state) {
        return (
            <Redirect to="/marketplace" />
        )
    } else {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="buy-page">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }} >
                            <img className={classes.details} src={`data:${props.location.state.data.data.item_image.contentType};base64,${new Buffer.from(props.location.state.data.data.item_image['data']).toString('base64')}`} alt="Logo" />
                        </Grid>
                        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }} className={classes.details}>
                            <Typography variant="h3" display="block" gutterBottom>Buy this NFT</Typography>
                            <TextField
                                label="NAME"
                                defaultValue={props.location.state.data.data.item_name}
                                variant="filled"
                                size="large"
                                className={classes.fullWidth}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                                        <TextField
                                label="POPULARITY"
                                defaultValue={props.location.state.data.data.item_popularity}
                                variant="filled"
                                size="large"
                                className={classes.fullWidth}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                                                                    <TextField
                                label="CURRENTLY OWNED BY"
                                defaultValue={props.location.state.data.seller}
                                variant="filled"
                                size="large"
                                className={classes.fullWidth}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                                                                    <TextField
                                label="DESCRIPTION"
                                defaultValue={props.location.state.data.data.item_description}
                                variant="filled"
                                size="large"
                                className={classes.fullWidth}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                                                                                       <TextField
                                label="Game ID"
                                defaultValue={props.location.state.data.data.game_id}
                                variant="filled"
                                size="large"
                                className={classes.fullWidth}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                                                                                           <TextField
                                label="Token ID"
                                defaultValue={props.location.state.data.token_id}
                                variant="filled"
                                size="large"
                                className={classes.fullWidth}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                                                                                                           <TextField
                                label="Price"
                                defaultValue={props.location.state.data.price + " ETH"}
                                variant="filled"
                                size="large"
                                className={classes.fullWidth}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <div style={{ display: 'flex', width: "100%" }}>
                                <Button
                                    variant={"contained"}
                                    size={"large"}
                                    color={"primary"}
                                    style={{width: "100%"}}
                                    onClick={onClick}>
                                    {"Buy"}
                                </Button>
                                <Fab color="primary" aria-label="add" size='small' style={{ position: 'relative', margin: "0 1rem" }}>
                                    <AddIcon onClick={() => {
                                        addToWatchList(props.userSessionData._id, props.location.state.data.data._id)
                                    }} />
                                </Fab>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </motion.div>
        )
    }
}

export default withRouter(Buy)
