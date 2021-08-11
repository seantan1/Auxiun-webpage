import React,{useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import './css/Sell.css'
import Item from './Item';
import {
    withRouter
} from "react-router-dom";
function Sell(props) {
    // const location = useLocation()
    // const { state } = location.state
    const useStyles = makeStyles((theme) => ({
        gridContainer: {
            paddingLeft: "4rem",
            paddingRight: "4rem"
        },
        gridItemContainer: {
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
        },
    }));
    useEffect(() => {
       console.log(props.location.state.data)
    }, [])
    const classes = useStyles();
    return (
        <div className="sell-page">
            <Grid container className={classes.gridContainer} >
                <Grid item xs={6}>
                    <Item data={props.location.state.data}></Item>
                </Grid>
                <Grid item xs={6}>
                    Sell Your NFT!
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(Sell)
