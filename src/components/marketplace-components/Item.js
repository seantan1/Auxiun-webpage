import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Item() {


    const useStyles = makeStyles({
        root: {
            minWidth: 200
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        price: {
            alignSelf: "right"
        },
    });
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea disableRipple>
                <CardMedia
                    className={classes.media}
                    image="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"
                    title="Contemplative Reptile"
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Item
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Item description
                    </Typography>
                    <Typography variant="overline" display="block" align="right" gutterBottom>
                        $123,123
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Item
