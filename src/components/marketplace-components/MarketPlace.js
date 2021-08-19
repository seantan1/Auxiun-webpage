import React, { useState, useEffect } from 'react'
import './css/MarketPlace.css'
import Item from './Item'
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';
import Filters from './Filters';

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
// axios
const axios = require('axios');

function MarketPlace(props) {
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
    const totalPageCount = () => {
        return Math.ceil(pageCount / 25)

    }

    const loadItems = (data) => {
        console.log(props.account)
        const items = [];
        for (const item in data) {
            items.push(
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Item {...props} data={data[item]} />
                </Grid>)
        }
        return items;
    }

    const classes = useStyles();

    // useEffect
    useEffect(() => {
        if (props.authorised) {
            let web3 = new Web3(window.ethereum);
            let contractMulticall = new web3.eth.Contract(MULTICALL_CONTRACT_ABI, MULTICALL_CONTRACT_ADDRESS);
            contractMulticall.methods.multiCallNFTsOnMarket().call()
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
        <div className="marketplace-container">
            <Grid container className={classes.gridContainer} >
                {props.authorised ?
                    <>
                        <Grid item xs={12} sm={"auto"} md={2}>
                            <Filters />
                        </Grid>


                        <Grid item xs={12} sm={12} md={10}>
                            <Grid
                                container
                                flex
                                className={classes.top}>
                                <Grid item xs={12}>
                                    <Pagination count={totalPageCount()} showFirstButton showLastButton style={{ display: " flex", justifyContent: 'center', alignItems: 'center' }} />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={1}
                                className={(xs ? classes.gridItemContainer : classes.gridContainer)}

                            >
                                {loadItems(item)}

                            </Grid>
                        </Grid></> :
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <Typography variant="h1">Please connect your Metamask</Typography>
                        </Grid>
                    </Grid>}
            </Grid>
        </div >
    )
}

export default MarketPlace

