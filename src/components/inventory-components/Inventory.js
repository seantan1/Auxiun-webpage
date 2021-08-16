import './css/Inventory.css';

import { Button, Card, Chip, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useState, useEffect } from 'react'

import Item from './Item';

// web3 and axios for NFT data & metadata
import Web3 from 'web3';
// contract data
import {
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI
} from "../../contract-data/token-contract-data";

const Inventory = (props) => {

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

    // useEffect
    useEffect(() => {
        if (props.authorised) {
            let web3 = new Web3(window.ethereum);
            let contract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
            contract.methods.multiCallNFTsOnMarket().call()
                .then(function (result) {
                    console.log("multifetch", result);
                    setPageCount(result[0].length)
                    // TODO: might want to change this to your liking
                    // currently there should be 3 NFT in total listed on sale
                    for (const data in result[0]) {
                        fetchMetadata(result[0][data], result[1][data], String(web3.utils.fromWei(result[2][data])), result[3][data])
                    }
                    // price needs to be converted from wei to ethers using the web3.utils.fromWei function
                    //console.log("Price: " + String(web3.utils.fromWei(result[2][0])) + " ethers"); // example
                });
        }
    }, [props.authorised]);

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

                <Card>
                    <Grid container spacing={2} className='inventory-items'>
                        {loadItems(item)}
                    </Grid>
                </Card>
            </div>
        </div>
    );
}

export default Inventory;
