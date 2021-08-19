import React, { useState } from 'react'
import { Button, Checkbox, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TreeItem from '@material-ui/lab/TreeItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useForm, Form } from '../form/useForm';
import Controls from '../form/controls/Controls'
import './css/MarketPlace.css'
function Filters() {

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
            marginTop: "2rem"
        },
    }));
    const sortBy = [
        { id: 'mostpopular', title: 'Most Popular' },
        { id: 'leastpopular', title: 'Least Popular' },
        { id: 'mostexpensive', title: 'Most Expensive' },
        { id: 'leastexpensive', title: 'Least Expensive' },
    ]
    const colours = ["Blue", "Black", "Red", "Pink", "Yellow", "Grey", "Orange", "White", "Green", "Brown"]
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
        sortBy: 'mostpopular',
        colourBlue: false,
        colourBlack: false,
        colourRed: false,
        colourPink: false,
        colourYellow: false,
        colourGrey: false,
        colourOrange: false,
        colourWhite: false,
        colourGreen: false,
        colourBrown: false,
    }
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
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
        <Form onSubmit={handleSubmit} className={classes.root}>
            <Controls.Input
                name="search"
                label="Search"
                value={values.search}
                onChange={handleInputChange}
                error={errors.search}
            />
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >

                <TreeItem nodeId={"Sort By"} label={"Sort By"} className={classes.treeItem}>
                    <Controls.RadioGroup
                        name="sortBy"
                        value={values.sortBy}
                        onChange={handleInputChange}
                        items={sortBy}
                    />
                </TreeItem>
                <TreeItem nodeId={"Color"} label={"Color"} className={classes.treeItem}>
                    {colours.map((name, i) => (
                        <Controls.Checkbox
                            key={`colour` +name}
                            name={`colour` + name}
                            label={name}
                            value={values[`colour` + name]}
                            onChange={handleInputChange}
                        />
                    ))}
                </TreeItem>
            </TreeView>
            <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm} />
            <Controls.Button
                type="submit"
                text="Save Filter" />
        </Form >
    )
}

export default Filters
