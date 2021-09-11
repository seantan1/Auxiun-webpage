import { Card, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useContext } from "react";
import darkThemeContext from "../darkThemeContext";
import Item from './Item'

import "./css/Watch.css";

// axios
const axios = require('axios');

export default function Watch(props) {
    const { darkTheme } = useContext(darkThemeContext);

    const [data, setData] = useState([])
    let storeArray = [];

    useEffect(() => {
        // console.log(props.userSessionData._id)
        // axios fetching watchlist by user_id
        if (props.userSessionData._id !== undefined) {
            axios.get(process.env.REACT_APP_DATABASE_API_FETCH_WATCHLISTS_BY_USER_ID + props.userSessionData._id).then(response => {
                // this is an array of watchlists which contains
                // 1. user_id
                // 2. nftMetadata_id

                // nftMetadata can be fetched using the nftMetadata_id
                response.data.data.forEach((watchlist) => {
                    axios.get(process.env.REACT_APP_DATABASE_API_NFT_URL + watchlist.nftMetadata_id).then(response => {
                        // console.log("id: " + response.data.data._id);
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                        storeArray = [...storeArray, response.data.data ];
                        setData(storeArray);
                    })
                });
            });
        }
    }, [props.userSessionData])

    const deleteWatchItem = (watchlist_id) => {
        axios.delete(process.env.REACT_APP_DATABASE_API_WATCHLISTS + watchlist_id).then(response => {
            console.log(response);
            props.showAlert("Success", "Item has been removed from watchlist", "", "success");
        })
    }

    const loadItems = (data, deleteWatchItemCallback) => {
        let itemList = [];
        data.forEach(item => {
            itemList.push(
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Item data={item} deleteWatchItem={deleteWatchItemCallback} />
            </Grid>
            )
        })
        return itemList;
    }

    return (
        <div className='watch-content'>
            <h1 style={{paddingLeft:'15%'}}>You're Currently Watching</h1>
            <Card className='watch-card' style={{ backgroundColor: darkTheme ? '#424242' : '' }}>
                <Grid container spacing={2}>
                    {loadItems(data, deleteWatchItem)}
                </Grid>
            </Card>
        </div>
    );
}
