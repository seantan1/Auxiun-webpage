import './css/Inventory.css';

import { Button, Card, Chip, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useState, useEffect, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import darkThemeContext from "../darkThemeContext";
import Item from './Item';

// web3 and axios for NFT data & metadata
import Web3 from 'web3';
// contract data
import {
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    MULTICALL_CONTRACT_ADDRESS,
    MULTICALL_CONTRACT_ABI
} from "../../contract-data/token-contract-data";

const Inventory = (props) => {

    const { darkTheme } = useContext(darkThemeContext);
    const [chips, setChips] = useState([{}]);
    const [showBought, setBought] = useState(false);
    const [showSelling, setSelling] = useState(false);
    const [showSold, setSold] = useState(false);

    const handleBoughtButtons = () => {
        setBought(!showBought)
    }
    const handleSellingButtons = () => {
        setSelling(!showSelling)
    }
    const handleSoldButtons = () => {
        setSold(!showSold)
    }

    // axios
    const axios = require('axios');

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('sm'));
    const [item, setItem] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const useStyles = makeStyles((theme) => ({
        gridContainer: {
            paddingLeft: "4rem",
            paddingRight: "4rem"
        },
        gridItemContainer: {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
        },
    }));

    const loadItems = (data) => {
        const items = [];
        for (const item in data) {
            items.push(
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Item data={data[item]} />
                </Grid>)
        }
        return items;
    }

    const classes = useStyles();
    const [testSell, setTestSell] = useState("")
    const testButton = () => {
        let web3 = new Web3(window.ethereum);
        let amount = web3.utils.toWei("0.001", 'ether');
        listNFTOnMarket(String(testSell), amount);
    }
    // useEffect
    useEffect(() => {
        if (props.authorised) {
            let web3 = new Web3(window.ethereum);
            let contractMulticall = new web3.eth.Contract(MULTICALL_CONTRACT_ABI, MULTICALL_CONTRACT_ADDRESS);

            // multiple contract functions u can call, function name should be intuitive on what they return
            contractMulticall.methods.multiCallNFTsOwnedByAddress(props.account).call()
                .then(function (result) {
                    console.log("NFTs owned by you (not listed for sale): ", result);
                    // order: tokenIds, tokenURIs
                });

            contractMulticall.methods.multiCallNFTsOnMarket(props.account).call()
                .then(function (result) {
                    console.log("Your NFTs listed on the marketplace: ", result);
                    // order: tokenIds, tokenURIs, tokenPrices, tokenSellers
                });

            contractMulticall.methods.multiCallTransactionDataByUser(props.account).call()
                .then(function (result) {
                    console.log("Your marketplace transactions: ", result);
                    // order: tokenIds, tokenBuyers, tokenSellers, prices, timestamps, transactionType (true means buy (you are the buyer), false means sell)
                });
        }
    }, [props.authorised]);

    // function to list your NFT on market
    const listNFTOnMarket = (tokenId, price) => {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
        contract.methods.listNFTOnMarket(tokenId, price).send({
            from: props.account
        }).then(function (result) {
            console.log(result);
            // TODO: add alert
        });
    }

    const handleTestSell= (e) => {
        setTestSell(e.target.value);
    }
    // TEST function: axios call function
    const fetchMetadata = (tokenid, uri, price, seller) => {
        // axios fetching metadata of NFT
        axios.get(uri).then(response => {
            console.log(seller)
            const itemData = {
                token_id: tokenid,
                data: response['data'][0],
                price: price,
                seller: seller
            }
            setItem(item => [...item, itemData])
        });
    }

    return (
        <div className="inventory-page">
            <div className='inventory-content'>
                <div className='inventory-header'>
                    <div className='selector-switch'>
                        <Button variant="contained" color="primary" className='selector-switch__button' onClick={handleBoughtButtons}>
                            Bought
                        </Button>
                        <Button variant="contained" color="primary" className='selector-switch__button' onClick={handleSellingButtons}>
                            Selling
                        </Button>
                        <Button variant="contained" color="primary" className='selector-switch__button' onClick={handleSoldButtons}>
                            Sold
                        </Button>
                        <br></br><br></br>
                    </div>
                    <div className='inventory-status'>
                        {showBought ?
                            <Chip label="Showing Bought" onDelete={handleBoughtButtons} color="primary" variant="outlined" className='selector-switch__button' />
                            : ""}
                        {showSelling ?
                            <Chip label="Showing Selling" onDelete={handleSellingButtons} color="primary" variant="outlined" className='selector-switch__button' />
                            : ""}
                        {showSold ?
                            <Chip label="Showing Sold" onDelete={handleSoldButtons} color="primary" variant="outlined" className='selector-switch__button' />
                            : ""}
                        <br></br><br></br><br></br>
                    </div>
                </div>

                <Card style={{backgroundColor: darkTheme ? '#272727' : ''}}>
                    <Grid container spacing={2} className='inventory-items'>
                            <TextField value={testSell} onChange={handleTestSell}></TextField>
                        <Button variant="contained" color="primary" onClick={testButton}>
                            Danny's Test Button
                        </Button>
                        {loadItems(item)}
                    </Grid>
                </Card>
            </div>
        </div>
    );
}

export default Inventory;
