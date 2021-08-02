import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
function Item(props) {

    useEffect(() => {
        console.log(props.data)
    }, [])
    const useStyles = makeStyles({
        root: {
            minWidth: 200,
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
    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea disableRipple>
                <CardMedia
                    className={classes.media}
                    image={props.data.image}
                    title="Contemplative Reptile"
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.data.description}
                    </Typography>
                    <Divider className={classes.divider} light />
                    <Typography variant="overline" display="block" align="right" gutterBottom>
                        {"$" + Number(props.data.price).toLocaleString()}

                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Item
