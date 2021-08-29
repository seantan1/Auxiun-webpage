import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import StorefrontIcon from '@material-ui/icons/Storefront';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import {
    Link,
} from "react-router-dom";
import darkThemeContext from "../darkThemeContext";
import { useContext } from "react";

function Item(props) {
    const { darkTheme } = useContext(darkThemeContext);
    const [item, setItem] = useState()
    useEffect(() => {
        setItem(props.data)
    }, [props.data])
    const useStyles = makeStyles({
        root: {
            margin: "auto",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            width: props.width,
            "&:hover": {
                boxShadow: "0 40px 70px -12.125px rgba(0,0,0,0.3)",
            },
            backgroundColor: darkTheme ? '#2c2c2c' : '',
            color: darkTheme ? 'aliceblue' : '',
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        price: {
            alignSelf: "right"
        },
        divider: {
            margin: `1rem 0`,
            background: darkTheme ? 'gray' : '',
        },
    });

    const classes = useStyles();
    if (!item) {
        return null
    } else {
        return (
            <Link to={{
                pathname: '/buy',
                state: { ...props }
            }}>
            <Card className={`${classes.root} animate`} variant="outlined" key={item.token_id + item.seller}>
                    <CardActionArea disableRipple>
                        <CardMedia
                            className={classes.media}
                            image={`data:${item.data.item_image.contentType};base64,${new Buffer.from(item.data.item_image['data']).toString('base64')}`}
                            title="Contemplative Reptile"
                        />
                        {console.log("Item Name",item.data.item_name)}
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {item.data.item_name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}><StorefrontIcon style={{ color: darkTheme ? 'gray' : '' }} /><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: darkTheme ? 'aliceblue' : '' }}>{item.seller}</span></div>
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}><InsertPhotoIcon style={{ color: darkTheme ? 'gray' : '' }}  /><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: darkTheme ? 'aliceblue' : '' }}>{item.token_id}</span></div>
                            </Typography>
                            <Typography variant="body2" color= {darkTheme ? 'aliceblue' : ''}>
                                {item.data.item_description}
                            </Typography>
                            <Divider className={classes.divider} light />
                            <Typography variant="overline" display="block" align="right" gutterBottom>
                                {item.price + " ETH"}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        )
    }
}

export default Item
