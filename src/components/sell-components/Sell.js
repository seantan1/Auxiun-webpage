import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Controls from '../form/controls/Controls'
import { useForm, Form } from '../form/useForm';
import './css/Sell.css'
import Item from './Item';
import {
    withRouter
} from "react-router-dom";
import { Typography } from '@material-ui/core';
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
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('sellprice' in fieldValues)
            temp.sellprice = fieldValues.sellprice ? 0 : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const initialFValues = {
        sellprice: 0,
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            // API for selling goes here
            console.log(values)
        }
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFValues, true, validate);
    const classes = useStyles();
    return (
        <div className="sell-page">
            <Grid container className={classes.gridContainer}>
                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Item data={props.location.state.data}></Item>
                </Grid>
                <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start" }}>
                    <Typography variant="h3">Sell your nft</Typography>
                    <Form onSubmit={handleSubmit}>
                        <Controls.Input
                            name="sellprice"
                            label="Sell Price"
                            value={values.sellprice}
                            onChange={handleInputChange}
                            error={errors.sellprice}
                        />
                        <Controls.Button
                            type="submit"
                            text="Create listing" />
                    </Form>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Sell)
