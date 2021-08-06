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
function MarketPlace() {
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
    return (
        <div className="marketplace-container">
            <Grid container spacing={3} className={classes.gridContainer} >

                <Grid item xs={12} sm={"auto"} md={2}>
                    <Filters/>
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

