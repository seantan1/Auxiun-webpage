import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StorefrontIcon from '@material-ui/icons/Storefront';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
function Item(props) {
    const [item, setItem] = useState()
    useEffect(() => {
        setItem(props.data)
    }, [props.data])
    const useStyles = makeStyles({
        root: {
            margin: "auto",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            "&:hover": {
                boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
            }
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        price: {
            alignSelf: "right"
        },
        divider: {
            margin: `1rem 0`
        },
    });

    const classes = useStyles();
    if (!item) {
        return null
    } else {
        return (
            <Card className={classes.root} variant="outlined">
                <CardActionArea disableRipple>
                    <CardMedia
                        className={classes.media}
                        image={`data:${item.data.item_image.contentType};base64,${new Buffer.from(item.data.item_image['data']).toString('base64')}`}
                        title="Contemplative Reptile"
                    />
                    {console.log(item.data.item_name)}
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {item.data.item_name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}><StorefrontIcon /><span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{item.seller}</span></div>

                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}><InsertPhotoIcon /><span style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{item.token_id}</span></div>

                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {item.data.item_description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}

export default Item
