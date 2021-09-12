import React, {useEffect} from 'react'
import { Grid } from '@material-ui/core'
import Item from './Item'
function LoadCards(props) {
    useEffect(() => {
        console.log("loading")
    }, [])
    return (
        (props.filtered?
            props.filtered.slice(props.minValue, props.maxValue).map((item, index) => (
                <Grid item xs={6} md={4} lg={3} xl={2}>
                    <Item data={item} />
                </Grid>
    
            )) :  null  )
        

    )
}

export default LoadCards
