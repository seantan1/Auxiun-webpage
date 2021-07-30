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
function MarketPlace() {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('sm'));
    const [filters, setFilters] = useState({
        "Filter 1": {
            "Black": false,
            "Orange": false,
            "Blue": false,
        },
        "Filter 2": {
            "Black": false,
            "option5": false,
            "option6": false,
        },
        "Filter 3": {
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
        }
    }));
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
    const loadFilters = () => {
        const list = [];

        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <Grid
                    container>
                    <Grid item xs={4} md={12}>
                        {(() => {


                            for (const data in filters) {

                                // Get sub item of catergory
                                list.push(<TreeItem nodeId={data} label={data} className={classes.treeItem}>
                                    <FormGroup>
                                        {(() => {
                                            const filterItem = [];
                                            for (const filter in filters[data]) {
                                                filterItem.push(<FormControlLabel
                                                    control={<Checkbox checked={filters[data][filter]} onChange={(e) => handleChange(data, e)} name={filter} className={classes.label} />}
                                                    label={filter}
                                                />)
                                            }
                                            return filterItem
                                        })()}
                                    </FormGroup>
                                </TreeItem>)
                            }
                        })()
                        }
                        {list}
                    </Grid>
                </Grid>
            </TreeView>

        )
    }

    const classes = useStyles();
    return (
        <div className="marketplace-container">
            <Grid container spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} className={classes.search}>
                    {xs ? <TextField id="market-search" label="Search" style={{ minWidth: "100%" }} /> : <TextField id="market-search" label="Search" />}

                </Grid>
                <Grid item xs={12} sm={"auto"} md={1}>
                    {loadFilters()}
                </Grid>


                <Grid item xs={12} sm={12} md={11}>
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

