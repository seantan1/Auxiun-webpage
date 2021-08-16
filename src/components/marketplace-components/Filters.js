import React, { useState } from 'react'
import { Button, TextField} from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";
import TreeItem from '@material-ui/lab/TreeItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Checkbox from '@material-ui/core/Checkbox';
function Filters() {
    const [sortBy, setSortBy] = useState('Most Popular');
    const [colour, setColour] = useState({
        black: false,
        white: false,
        blue: false,
        orange: false,
    });
    const handleColour = (event) => {
        setColour({ ...colour, [event.target.name]: event.target.checked });
    };
    
    const handleForm = (event) => {
        console.log(sortBy)
        console.log(colour)
        event.preventDefault();
    }
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
        }
    }));
    const handleChange = (e) => {
        setSortBy(e.target.value)

    }
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);
    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };
    const { black, white, blue, orange } = colour;
    const classes = useStyles();
    return (
        <form onSubmit={handleForm} className={classes.root}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                <TextField id="outlined-basic" label="Search" variant="outlined" className={classes.search} />
                <TreeItem nodeId={0} label={"Sort By"} className={classes.treeItem}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="Sort By"
                            name="sortBy"
                            value={sortBy}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="mostpopular" control={<Radio />} label="Most Popular" />
                            <FormControlLabel value="leastpopular" control={<Radio />} label="Least Popular" />
                            <FormControlLabel value="mostexpensive" control={<Radio />} label="Most Expensive" />
                            <FormControlLabel value="leastexpensive" control={<Radio />} label="Least Expensive" />
                            <FormControlLabel value="az" control={<Radio />} label="A-Z" />
                            <FormControlLabel value="za" control={<Radio />} label="Z-A" />
                        </RadioGroup>
                    </FormControl>
                </TreeItem>
                <TreeItem nodeId={1} label={"Color"} className={classes.treeItem}>
                    <FormControl component="fieldset" >
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={black} onChange={handleColour} name="black" />}
                                label="Black"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={white} onChange={handleColour} name="white" />}
                                label="White"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={blue} onChange={handleColour} name="blue" />}
                                label="Blue"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={orange} onChange={handleColour} name="orange" />}
                                label="Orange"
                            />
                        </FormGroup>
                    </FormControl>
                </TreeItem>
            </TreeView>

            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Save Filter
            </Button>
        </form >
    )
}

export default Filters
