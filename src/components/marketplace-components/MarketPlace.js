import React, { useState, useEffect } from 'react'
import './css/MarketPlace.css'
import Item from './Item'
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { sampleData } from './samepleData'
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Filters from './Filters';

// web3 and axios for NFT data & metadata
import Web3 from 'web3';
// contract data
import {
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI
} from "../../contract-data/token-contract-data";
// axios
const axios = require('axios');

function MarketPlace(props) {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('sm'));
    const [sortByFilter, setSortByFilter] = useState('Most Popular');
    const [filters, setFilters] = useState({
        "Sort By": {
            "FilterType": 'Select',
            "List": ["Most Popular", "Least Popular", "A-Z", "Z-A"],
            "Default": 'Most Popular',
        },
        "Color": {
            "FilterType": 'Checkbox',
            "Black": false,
            "option5": false,
            "option6": false,
        },
        "Filter 3": {
            "FilterType": 'Checkbox',
            "option7": false,
            "option8": false,
            "option9": false,
        },

    })
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const useStyles = makeStyles((theme) => ({
        gridContainer: {
            paddingLeft: "4rem",
            paddingRight: "4rem"
        },
        gridItemContainer: {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
        },
        search: {
            textAlign: "right",
            marginRight: "4rem"
        },
        label: {
            padding: 0,
            marginLeft: "1rem"
        },
        treeItem: {
            marginBottom: "1rem",
            whiteSpace: "nowrap",
        },
        // pagination: {
        //     display: "flex",
        //     justifyContent: "center",
        //     marginBottom: "1rem"
        // },
        selectEmpty: {
            minWidth: "10rem",
        }
    }));
    const totalPageCount = () => {
        return Math.ceil(sampleData.length / 25)

    }
    const handleChange = (name, event) => {
        setFilters({ ...filters, [name]: { ...filters[name], [event.target.name]: event.target.checked } });
    };

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
                    console.log(result);
                    // TODO: might want to change this to your liking
                    // currently there should be 3 NFT in total listed on sale
                    fetchMetadata(result[1][0]);
                    fetchMetadata(result[1][1]);
                    fetchMetadata(result[1][2]);
                    // price needs to be converted from wei to ethers using the web3.utils.fromWei function
                    console.log("Price: " + String(web3.utils.fromWei(result[2][0])) + " ethers"); // example
                });
        }
    }, [props.authorised]);

    // TEST function: axios call function
    const fetchMetadata = (uri) => {
        // axios fetching metadata of NFT
        axios.get(uri).then(response => {
            console.log(response);
        });
    }


    return (
        <div className="marketplace-container">
            <Grid container spacing={3} className={classes.gridContainer} >

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
                        {loadItems(sampleData)}
                    </Grid>
                </Grid>
            </Grid>


        </div>
    )
}

export default MarketPlace

