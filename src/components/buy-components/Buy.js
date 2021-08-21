import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
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
    MULTICALL_CONTRACT_ADDRESS,
    MULTICALL_CONTRACT_ABI
} from "../../contract-data/token-contract-data";
import { Typography } from '@material-ui/core';
function Buy(props) {
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
            background: "white",
            padding: "1rem",
            borderRadius: "5px",
        }
    }));

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
    useEffect(() => {
        console.log(props);
    }, [props])
    const onClick = () => {
        purchaseNFTOnMarket(props.location.state.data.token_id, props.location.state.data.price);
        
    }
    const classes = useStyles();
    if (!props.location.state) {
        return (
            <Redirect to="/marketplace"/>
        )
    } else {
        return (
            <div className="buy-page">
                <Grid container className={classes.gridContainer}>
                    <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center' }} >
                        <img className={classes.details} src={`data:${props.location.state.data.data.item_image.contentType};base64,${new Buffer.from(props.location.state.data.data.item_image['data']).toString('base64')}`} alt="Logo" />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }} className={classes.details}>
                        <Typography variant="h3" display="block" gutterBottom>Buy this NFT</Typography>
                        <Typography variant="h6" display="block" gutterBottom>{"NAME"}</Typography>
                        <Typography variant="body1" display="block" gutterBottom>{props.location.state.data.data.item_name}</Typography>
                        <Typography variant="h6" component="p" display="block" gutterBottom>{"CURRENTLY OWNED BY"}</Typography>
                        <Typography variant="body1" display="block" gutterBottom>{props.location.state.data.seller}</Typography>
                        <Typography variant="h6" component="p" display="block" gutterBottom>{"DESCRIPTION"}</Typography>
                        <Typography variant="body1" display="block" gutterBottom>
                            {props.location.state.data.data.item_description}
                        </Typography>
                        <Typography variant="h6" component="p" display="block" gutterBottom>{"GameID"}</Typography>
                        <Typography variant="body1" display="block" gutterBottom>{props.location.state.data.data.game_id}</Typography>
                        <Typography variant="h6" component="p" display="block" gutterBottom>{"TokenID"}</Typography>
                        <Typography variant="body1" display="block" gutterBottom>{props.location.state.data.token_id}</Typography>
                        <Typography variant="h6" component="p" display="block" gutterBottom>{"PRICE"}</Typography>
                        <Typography variant="body2" display="block" gutterBottom>
                            {props.location.state.data.price + " ETH"}
                        </Typography>
                            <Button
                                variant={"contained"}
                                size={"large"}
                                color={"primary"}
                                onClick={onClick}>
                                {"Buy"}
                            </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Buy)
