import './css/Inventory.css';

import { Button, Card, Grid } from '@material-ui/core';
import { useState } from 'react';

import Item from '../marketplace-components/Item';

const Inventory = () => {

    const [item, setItem] = useState([])

    return (
        <div className="inventory-page">
            <div className='inventory-content'>
                <div className='selector-switch'>
                    <Button variant="outlined" color="primary" className='selector-switch__button'>
                        Bought
                    </Button>
                    <Button variant="outlined" color="primary" className='selector-switch__button'>
                        Selling
                    </Button>
                    <Button variant="outlined" color="primary" className='selector-switch__button'>
                        Sold
                    </Button>
                </div>

                <Card>
                    <Grid container spacing={2} className='inventory-items'>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card>Item<br></br><br></br><br></br><br></br></Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card>Item<br></br><br></br><br></br><br></br></Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card>Item<br></br><br></br><br></br><br></br></Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card>Item<br></br><br></br><br></br><br></br></Card>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>


    );
}

export default Inventory;
