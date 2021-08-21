import React, { useState } from 'react'

import { Card } from "@material-ui/core"
import Grid from '@material-ui/core/Grid';
import ReactElasticCarousel from "react-elastic-carousel";

const MarketplaceCarousel = (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    const isMobile = (width <= 550);
    console.log(isMobile)

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];

    return (
        <div className='carouselContent'>
            <h1>Trending</h1>
            <Card className='carouselCard'>
                <ReactElasticCarousel
                    breakPoints={breakPoints}
                    itemsToScroll={1}
                    itemPadding={[15, 10, 15, 10]}
                    showArrows={!isMobile}
                >
                    {props.loadItems(props.item)}
                    {props.loadItems(props.item)}
                    {props.loadItems(props.item)}
                    {props.loadItems(props.item)}
                    {props.loadItems(props.item)}
                </ReactElasticCarousel>
            </Card>
        </div>
    );
}

export default MarketplaceCarousel