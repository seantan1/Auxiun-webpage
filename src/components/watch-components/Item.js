import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import StorefrontIcon from '@material-ui/icons/Storefront';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import darkThemeContext from "../darkThemeContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';

function Item(props) {
    // console.log('props', props);
    const [item, setItem] = useState()
    useEffect(() => {
        setItem(props.data)
        // console.log("LOADINGCARD", props.data.data)
    }, [props.data])
    const { darkTheme } = useContext(darkThemeContext);

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
            height: "100%"
        },
        media: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            paddingTop: '100%'
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
            <Card className={classes.root} variant="outlined">
                <CardActionArea disableRipple>
                    <CardContent style={{ background: "lightGray", padding: 0 }}>
                        <Typography gutterBottom variant="h5" component="p" style={{ textTransform: "uppercase" }}>
                            {item.type}
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        image={`data:${props.data.item_image.contentType};base64,${new Buffer.from(props.data.item_image['data']).toString('base64')}`}
                        title={props.data.item_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {props.data.item_name}
                        </Typography>
                        {!item.seller ? null :
                            <Typography variant="caption" color="textSecondary">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}><StorefrontIcon /><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.seller}</span></div>

                            </Typography>}
                        <Typography variant="caption" color="textSecondary">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}><InsertPhotoIcon /><span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.token_id}</span></div>

                        </Typography>
                        <Typography variant="body2" color={darkTheme ? 'aliceblue' : "textSecondary"}>
                            {props.data.item_description}
                        </Typography>
                        <Divider className={classes.divider} light />

                        {/* <div style={{ display: "flex", justifyContent: 'space-between' }}> */}
                            <Button variant="contained" color="primary" style={{ width: "45%" }} onClick={ () => props.deleteWatchItem(props.data._id)}>
                                Unwatch
                            </Button>
                            <Link to={{
                                pathname: '/buy',
                                state: { ...props.data.data }
                            }}>
                                <Button variant="contained" color="primary" style={{ width: "45%", marginLeft: 20 }}>
                                    Buy
                                </Button>
                            </Link >
                        {/* </div> */}
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

export default Item
