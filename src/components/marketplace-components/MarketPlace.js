import React, { useState, useEffect } from 'react'
import './css/MarketPlace.css'
import Item from './Item'
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme, } from "@material-ui/core/styles";
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
import LoadCards from './LoadCards';
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
    const [filter, setFilter] = useState()
    const [filtered, setFiltered] = useState([])
    const [nftSize, setNftSize] = useState(1)
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
    useEffect(() => {
        console.log("yep")
        setFiltered(item)
        setNftSize(nftSize => nftSize - 1)
    }, [item])
    const totalPageCount = () => {
        return (Math.ceil(item.length / pageSize))
    }
    useEffect(() => {
        //console.log(props.account)
        //console.log(props.userSessionData)
        if (!item) {
            //console.log("3")
            setError("There are no NFTs available")
        }
        if (!props.account) {
            //console.log("2")
            setError("Please connect MetaMask")
        }
        if (!props.userSessionData) {
            //console.log("1")
            setError("Log in to access the market place")
        }
        if (props.userSessionData && props.account && item) {
            setFiltered(item.sort((a, b) => a.data.item_popularity < b.data.item_popularity ? 1 : -1))
            setError("")
        }
    }, [props.userSessionData, props.account, item])
    function handleChange(event, value) {
        //console.log("value", value)
        //console.log("pagesize", pageSize)
        setPageSize(pageSize)
        if (value <= 1) {
            setMinValue(0)
            setMaxValue(pageSize)
        } else {
            setMinValue((value - 1) * pageSize)
            setMaxValue(value * pageSize)
        }
    }
    const filterData = async () => {
        let data = item;
        // data = filter.search && data.filter(item => String(item.data.item_name).toLowerCase().includes(String(filter.search).toLowerCase()))
        // }
        console.log("filtering by", filter.sortBy)
        switch (filter.sortBy) {
            case "mostpopular":
                console.log("Sorting", "Most Popular")
                console.log("Sorting", data)
                data = data.sort((a, b) => a.data.item_popularity < b.data.item_popularity ? 1 : -1)
                break;
            case "leastpopular":
                console.log("Sorting", "Least Popular")
                console.log("Sorting", data)
                data = data.sort((a, b) => a.data.item_popularity > b.data.item_popularity ? 1 : -1)
                break;
            case "mostexpensive":
                console.log("Sorting", "Most Expensive")
                console.log("Sorting", data)
                data = data.sort((a, b) => a.price > b.price ? 1 : -1)
                break;
            case "leastexpensive":
                console.log("Sorting", "Least Expensive")
                console.log("Sorting", data)
                data = data.sort((a, b) => a.price < b.price ? 1 : -1)
                break;
            default:
                break;
        }
        setFiltered(data)
    }

    useEffect(() => {
        history.push("/marketplace")
    }, [props.account, history])

    useEffect(() => {
        if (filter) {
            filterData()
        }
        console.log(filter)
    }, [filter])
    //this is just to adjust the styling on cards in trending without affecting the others. Remove when backend for
    //trending is implemented -- Harris
    const loadTrendingItems = (data) => {
        //console.log(data);
        const items = [].concat(data)
            .sort((a, b) => a.data.item_popularity < b.data.item_popularity ? 1 : -1)
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
                    //console.log("multifetch", result);
                    // TODO: might want to change this to your liking
                    // currently there should be 3 NFT in total listed on sale
                    setNftSize(result[0].length)
                    console.log("result", result)
                    fetchURLs({
                        tokenid: result[0],
                        uri: result[1].map((e) => axios.get(e)),
                        price: result[2].map((e) => String(web3.utils.fromWei(e))),
                        seller: result[3]
                    })
                    // price needs to be converted from wei to ethers using the web3.utils.fromWei function
                    ////console.log("Price: " + String(web3.utils.fromWei(result[2][0])) + " ethers"); // example
                });
        }
    }, [props.authorised]);

    async function fetchURLs(nftData) {
        try {
            axios.all(nftData.uri).then(axios.spread((...responses) => {
                for (const response in responses) {
                    const data = {
                        token_id: nftData.tokenid[response],
                        data: responses[response].data[0],
                        price: nftData.price[response],
                        seller: nftData.seller[response]
                    }
                    setItem(item => [...item, data])
                }

            }))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        load()
    }, [filtered])
    const load=() => {
        return (
            <LoadCards minValue={minValue} maxValue={maxValue} filtered={filtered} />
        )
    }
    return (
        <div className="marketplace-container" id="marketplace">
            {error ? <Grid item xs={12} style={{ textAlign: "center" }}><Typography variant="h3">{error}</Typography></Grid> :
                <Grid container className={classes.gridContainer} >

                    <Grid item xs={12} sm={"auto"} md={2}>
                        <Filters setFilter={setFilter} />
                    </Grid>

                    <Grid item xs={12} sm={12} md={10}>
                        <MarketplaceCarousel loadItems={loadTrendingItems} item={item} />
                        <Typography variant="subtitle">Displaying {filtered.length} Results</Typography>
                        <Grid
                            container
                            className={(xs ? classes.gridItemContainer : classes.gridContainer)}
                        >
                        {load()}      
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

