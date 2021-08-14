import React, {  useReducer } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';

import './css/Sell.css'
import Item from './Item';
import {
    withRouter
} from "react-router-dom";
function Sell(props) {
    const useStyles = makeStyles((theme) => ({
        gridContainer: {
            paddingLeft: "4rem",
            paddingRight: "4rem"
        },
        gridItemContainer: {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
        },
        root: {
            marginTop: "2rem"
        }
    }));
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            sellprice: "",
        }
    );
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = { formInput };
        console.log(data.formInput);
    }
    const handleInput = (event) => {
        const name = event.target.name;
        const newValue = event.target.value;
        setFormInput({ [name]: newValue });
    };
    const classes = useStyles();
    return (
        <div className="sell-page">
            <Grid container className={classes.gridContainer}>
                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Item data={props.location.state.data}></Item>
                </Grid>
                <Grid item xs={6}>
                    <form onSubmit={handleSubmit} className={classes.root}>
                        <Input type="number" minLength={0.0} step="0.01" name="sellprice" onChange={handleInput} />

                        <Button
                            type="submit"
                            variant="contained"
                            color="danger"
                        >
                            List NFT
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Sell)
