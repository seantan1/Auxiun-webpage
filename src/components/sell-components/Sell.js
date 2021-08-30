import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Controls from '../form/controls/Controls'
import { useForm, Form } from '../form/useForm';
import './css/Sell.css'
import Item from './Item';
import {
    withRouter,
    useHistory,
} from "react-router-dom";
import { Typography } from '@material-ui/core';
// web3 and axios for NFT data & metadata
import Web3 from 'web3';
import {
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
} from "../../contract-data/token-contract-data";
function Sell(props) {
    const history = useHistory();
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
        if ('sellprice' in fieldValues) {
            temp.sellprice = fieldValues.sellprice ? "" : "This field is required."
        }
        if ('sellprice' in fieldValues)
            temp.sellprice = fieldValues.sellprice > 0 ? "" : "Invalid price"
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
            let web3 = new Web3(window.ethereum);
            let amount = web3.utils.toWei(values.sellprice, 'ether');
            listNFTOnMarket(props.location.state.data.token_id, amount);

        }
    }

    // function to list your NFT on market
    const listNFTOnMarket = (tokenId, price) => {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
        contract.methods.listNFTOnMarket(tokenId, price).send({
            from: props.account
        }).on('transactionHash', (hash) => {
            props.showAlert(`NFT listed on Marketplace.\n Transaction ID: ${hash}`)
            history.push('/marketplace');
        })
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
                            text="Sell this nft" />
                    </Form>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Sell)
