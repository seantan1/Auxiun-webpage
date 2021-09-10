import { Card, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useContext } from "react";
import darkThemeContext from "../darkThemeContext";
import Item from '../marketplace-components/Item'

import "./css/Watch.css";

// axios
const axios = require('axios');

export default function Watch(props) {
    const { darkTheme } = useContext(darkThemeContext);

    useEffect(() => {
        // axios fetching watchlist by user_id
        if (props.userSessionData._id !== undefined) {
            axios.get(process.env.REACT_APP_DATABASE_API_FETCH_WATCHLISTS_BY_USER_ID + props.userSessionData._id).then(response => {
                // this is an array of watchlists which contains
                // 1. user_id
                // 2. nftMetadata_id
                console.log(response.data.data);

                // nftMetadata can be fetched using the nftMetadata_id
                response.data.data.forEach((watchlist) => {
                    axios.get(process.env.REACT_APP_DATABASE_API_NFT_URL + watchlist.nftMetadata_id).then(response => {
                        console.log(response.data.data);
                    })
                });
            });
        }
    }, [props.userSessionData])

    return (
        <div className='watch-content'>
            <Card className='watch-card' style={{ backgroundColor: darkTheme ? '#424242' : '' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Item></Item>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}
