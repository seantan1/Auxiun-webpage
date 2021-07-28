import React, { useState, useEffect } from 'react'
import './css/MarketPlace.css'
import Item from './Item'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
function MarketPlace() {
    const [filters, setFilters] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        option6: false,
        option7: false,
        option8: false,
        option9: false,
    })
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const { option1, option2, option3, option4, option5, option6, option7, option8, option9 } = filters;
    const useStyles = makeStyles((theme) => ({
        gridContainer: {
            paddingLeft: "40px",
            paddingRight: "40px"
        },
        search: {
            textAlign: "right",
        },
        label: {
            padding: 0,
        },
        treeItem: {
            marginBottom: "1rem"
        }
    }));
    const handleChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.checked });
    };

    const classes = useStyles();
    return (
        <div className="marketplace-container">
            <Grid container spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} className={classes.search}>
                    <TextField id="market-search" label="Search" />
                </Grid>
                <Grid item xs={1}>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        expanded={expanded}
                        selected={selected}
                        onNodeToggle={handleToggle}
                        onNodeSelect={handleSelect}
                    >
                        <TreeItem nodeId="1" label="Filter 1" className={classes.treeItem}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={option1} onChange={handleChange} name="option1" className={classes.label}/>}
                                    label="Option 1"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={option2} onChange={handleChange} name="option2" className={classes.label}/>}
                                    label="Option 2"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={option3} onChange={handleChange} name="option3" className={classes.label}/>}
                                    label="Option 3"
                                />
                            </FormGroup>
                        </TreeItem>
                        <TreeItem nodeId="2" label="Filter 2" className={classes.treeItem}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={option4} onChange={handleChange} name="option4" className={classes.label}/>}
                                    label="Option 1"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={option5} onChange={handleChange} name="option5" className={classes.label}/>}
                                    label="Option 2"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={option6} onChange={handleChange} name="option6" className={classes.label}/>}
                                    label="Option 3"
                                />
                            </FormGroup>
                        </TreeItem>
                        <TreeItem nodeId="3" label="Filter 3" className={classes.treeItem}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={option7} onChange={handleChange} name="option7" className={classes.label}/>}
                                    label="Option 1"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={option8} onChange={handleChange} name="option8" className={classes.label}/>}
                                    label="Option 2"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={option9} onChange={handleChange} name="option9" className={classes.label}/>}
                                    label="Option 3"
                                />
                            </FormGroup>
                        </TreeItem>

                    </TreeView>

                </Grid>
                <Grid item xs={11}>
                    <Grid
                        container
                        spacing={1}
                        className={classes.gridContainer}

                    >
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </div>
    )
}

export default MarketPlace

