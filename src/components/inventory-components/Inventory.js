import './css/Inventory.css';

import { Button, Card, Chip, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Item from './Item';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment'
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
    // axios
    const axios = require('axios');

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('sm'));

    const [owned, setOwned] = useState([])
    const [onMarket, setOnMarket] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [chips, setChips] = useState([{}]);
    const [showBought, setBought] = useState(false);
    const [showSelling, setSelling] = useState(false);
    const [showSold, setSold] = useState(false);
    const [item, setItem] = useState([])
    const [transactions, setTransactions] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const handleBoughtButtons = () => {
        setSold(false)
        setBought(!showBought)
    }
    const handleSellingButtons = () => {
        setSold(false)
        setSelling(!showSelling)
    }
    const handleSoldButtons = () => {
        setSold(!showSold)
        setSelling(false)
        setBought(false)
    }


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
    useEffect(() => {
        if (showBought && showSelling) {
            const data = item.filter(a => a.type === "selling" || "owned").sort(function (a, b) {
                return a.token_id - b.token_id;
            });
            setFilteredData(data)
        } else if (showBought) {
            const data = item.filter(a => a.type === "owned").sort(function (a, b) {
                return a.token_id - b.token_id;
            });
            setFilteredData(data)
        } else if (showSelling) {
            const data = item.filter(a => a.type === "selling").sort(function (a, b) {
                return a.token_id - b.token_id;
            });
            setFilteredData(data)
        } else {
            setFilteredData([])
        }
    }, [showBought, showSelling])
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
                    for (const data in result[0]) {
                        fetchMetadataOwned(result[0][data], result[1][data])
                    }
                });

            contractMulticall.methods.multiCallNFTsOnMarket(props.account).call()
                .then(function (result) {
                    console.log("Your NFTs listed on the marketplace: ", result);
                    // order: tokenIds, tokenURIs, tokenPrices, tokenSellers
                    for (const data in result[0]) {

                        fetchMetadataOnMarket(result[0][data], result[1][data], result[2][data], result[3][data])
                    }
                });

            contractMulticall.methods.multiCallTransactionDataByUser(props.account).call()
                .then(function (result) {
                    console.log("Your marketplace transactions: ", result);
                    for (const data in result[0]) {

                        fetchMetadataTransactions(result[0][data], result[1][data], result[2][data], result[3][data], result[4][data], result[5][data])
                    }
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
    const fetchMetadataOwned = (tokenid, uri) => {
        // axios fetching metadata of NFT
        axios.get(uri).then(response => {
            const itemData = {
                token_id: tokenid,
                data: response['data'][0],
                type: "owned"
            }
            setItem(item => [...item, itemData])
        });
    }
    const fetchMetadataTransactions = (tokenIds, tokenBuyers, tokenSellers, prices, timestamps, transactionType) => {
        // axios fetching metadata of NFT
        let web3 = new Web3(window.ethereum);
        const itemData = {
            tokenIds: tokenIds,
            tokenBuyers: tokenBuyers,
            tokenSellers: tokenSellers,
            prices: web3.utils.fromWei(prices, 'ether'),
            timestamps: timestamps,
            transactionType: transactionType
        }
        setTransactions(transactions => [...transactions, itemData])
    }
    const fetchMetadataOnMarket = (tokenIds, tokenURIs, tokenPrices, tokenSellers) => {
        // axios fetching metadata of NFT
        let web3 = new Web3(window.ethereum);
        axios.get(tokenURIs).then(response => {
            const itemData = {
                token_id: tokenIds,
                data: response['data'][0],
                price: web3.utils.fromWei(tokenPrices, 'ether'),
                seller: tokenSellers,
                type: "selling"
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

                        {!showSold ? loadItems(filteredData) :
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Token ID</TableCell>
                                            <TableCell align="right">Buyer Address</TableCell>
                                            <TableCell align="right">Seller Address</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Transaction Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transactions.map((transaction) => (
                                            <TableRow key={transaction.timestamps+ transaction.tokenBuyers}>
                                                <TableCell component="th" scope="row">
                                                    {transaction.tokenIds}
                                                </TableCell>
                                                <TableCell align="right">{transaction.tokenBuyers}</TableCell>
                                                <TableCell align="right">{transaction.tokenSellers}</TableCell>
                                                <TableCell align="right">{transaction.prices}</TableCell>
                                                <TableCell align="right">{moment.unix(transaction.timestamps).format('LLLL')}</TableCell>
                                                <TableCell align="right">{transaction.transactionType? "PURCHASED" : "SOLD"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>}
                    </Grid>
                </Card>
            </div>
        </div>
    );
}

export default Inventory;
// tokenIds: tokenIds,
// tokenBuyers: tokenBuyers,
// tokenSellers: tokenSellers,
// prices: prices,
// timestamps: timestamps,
// transactionType: transactionType