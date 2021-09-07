import React, { useState, useEffect } from 'react'
import './css/MarketPlace.css'
import Item from './Item'
import Grid from '@material-ui/core/Grid';
import { makeStyles,useTheme, } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';
import Filters from './Filters';
import darkThemeContext from "../darkThemeContext";
import { useContext } from "react";

// web3 and axios for NFT data & metadata
import Web3 from 'web3';
// contract data
import {
    MULTICALL_CONTRACT_ADDRESS,
    MULTICALL_CONTRACT_ABI
} from "../../contract-data/token-contract-data";
import { Typography } from '@material-ui/core';
import MarketplaceCarousel from './MarketplaceCarousel';
import { useHistory, withRouter } from 'react-router-dom';
// axios
const axios = require('axios');

function MarketPlace(props) {
    const { darkTheme } = useContext(darkThemeContext);
    const history = useHistory()
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('sm'));
    const [item, setItem] = useState([])
    const [error, setError] = useState("")
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(25);
    const [pageSize, setPageSize] = useState(25);

    const useStyles = makeStyles((theme) => ({
        gridContainer: {
            paddingLeft: "4rem",
            paddingRight: "4rem"
        },
        gridItemContainer: {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: darkTheme ? '#fff' : ''
            }
        }
    }));

    const totalPageCount = () => {
        return (Math.ceil(item.length / pageSize))
    }
    useEffect(() => {
        console.log(props.account)
        console.log(props.userSessionData)
        if (!item) {
            console.log("3")
            setError("There are no NFTs available")
        }
        if (!props.account) {
            console.log("2")
            setError("Please connect MetaMask")
        }
        if (!props.userSessionData) {
            console.log("1")
            setError("Log in to access the market place")
        }
        if (props.userSessionData && props.account && item) {
            setError("")
        }
    }, [props.userSessionData, props.account, item])
    function handleChange(event, value) {
        console.log("value", value)
        console.log("pagesize", pageSize)
        setPageSize(pageSize)
        if (value <= 1) {
            setMinValue(0)
            setMaxValue(pageSize)
        } else {
            setMinValue((value - 1) * pageSize)
            setMaxValue(value * pageSize)
        }
    }
    useEffect(() => {
        history.push("/marketplace")
    }, [props.account, history])
    const loadItems = (data) => {
        const items = [];
        for (const item in data) {
            items.push(
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <Item data={data[item]} />
                </Grid>
            )
        }
        return items;
    }

    //this is just to adjust the styling on cards in trending without affecting the others. Remove when backend for
    //trending is implemented -- Harris
    const loadTrendingItems = (data) => {
        console.log(data);
        const items = [].concat(data)
        .sort((a,b) => a.data.item_popularity < b.data.item_popularity ? 1 : -1)
        .map((item, i) => <Item key={i} data={item} />);
        
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
        <div className="marketplace-container" id="marketplace">
            {error ? <Grid item xs={12} style={{ textAlign: "center" }}><Typography variant="h3">{error}</Typography></Grid> :
                <Grid container className={classes.gridContainer} >

                    <Grid item xs={12} sm={"auto"} md={2}>
                        <Filters />
                    </Grid>

                    <Grid item xs={12} sm={12} md={10}>
                        <MarketplaceCarousel loadItems={loadTrendingItems} item={item} />
                        <Grid
                            container
                            className={(xs ? classes.gridItemContainer : classes.gridContainer)}
                        >
                            {loadItems(item.slice(minValue, maxValue))}
                        </Grid>
                        <br></br><br></br>
                        <Grid
                            container
                            flex={"true"}
                            className={classes.top}>
                            <Grid item xs={12}>
                                <Pagination count={totalPageCount()} onChange={handleChange} defaultValue={1} showFirstButton showLastButton color={darkTheme ? 'primary' : ''} style={{ display: " flex", justifyContent: 'center', alignItems: 'center' }} />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>}
        </div>
    )


}

export default withRouter(MarketPlace)

