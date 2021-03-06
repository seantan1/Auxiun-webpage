import React, { useState, useContext, useEffect } from 'react'
import { Button, Checkbox, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useForm, Form } from '../form/useForm';
import Controls from '../form/controls/Controls'
import './css/MarketPlace.css'
import darkThemeContext from "../darkThemeContext";
import Grid from '@material-ui/core/Grid';
import './css/MarketPlace.css';
function Filters(props) {
    const { darkTheme } = useContext(darkThemeContext);

    const useStyles = makeStyles((theme) => ({
        treeItem: {
            marginBottom: "1rem",
            whiteSpace: "nowrap",

        },
        search: {
            marginBottom: "1rem",
            whiteSpace: "nowrap",
        },
        root: {
            marginTop: "2rem",
            "& .MuiFormControl-root": {
                display: "flex !important",
            }
        },
        darkInput: {
            "& input": {
                color: darkTheme === true ? '#EBEBEB' : "blue"
            },
            "& label": {
                color: darkTheme === true ? 'gray' : "#b3b3b3"
            },
            "&:hover label": {
                color: darkTheme === true ? '#EBEBEB' : "blue"
            },
            "& label.Mui-focused": {
                color: darkTheme === true ? '#EBEBEB' : "blue"
            },
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: darkTheme === true ? '#EBEBEB' : "#b3b3b3"
                },
                "&:hover fieldset": {
                    borderColor: darkTheme === true ? '#EBEBEB' : "blue"
                },
                "&.Mui-focused fieldset": {
                    borderColor: darkTheme === true ? '#EBEBEB' : "blue"
                }
            }
        },

    }));
    const sortBy = [
        { id: 'mostpopular', title: 'Most Popular' },
        { id: 'leastpopular', title: 'Least Popular' },
        { id: 'mostexpensive', title: 'Most Expensive' },
        { id: 'leastexpensive', title: 'Least Expensive' },
    ]
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const initialFValues = {
        search: '',
        sortBy: '',
    }

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const handleSubmit = e => {
        e.preventDefault()
        props.setLoading(true)
        props.setFilter(values);
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);
    const classes = useStyles();
    return (
        <Form onSubmit={handleSubmit} className={`${classes.root} ${classes.darkInput}`}>
            <Controls.Input
                name="search"
                label="Search"
                value={props.search || values.search}
                onChange={handleInputChange}
                error={errors.search}
            />
            <br />
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <Grid container>
                    <Grid item xs={6} md={12}>
                        <TreeItem nodeId={"Sort By"} label={"Sort By"} className={classes.treeItem}>
                            <Controls.RadioGroup
                                name="sortBy"
                                value={values.sortBy}
                                onChange={handleInputChange}
                                items={sortBy}
                            />
                        </TreeItem>
                        </Grid>
                </Grid>

            </TreeView>
            <Controls.Button
                text="Reset"
                color="initial"
                onClick={resetForm} />
            <Controls.Button
                type="submit"
                text="Save Filter" />
        </Form>
    )
}

export default Filters
