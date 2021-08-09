import './css/Inventory.css';

import { Button, Card, Chip, Grid } from '@material-ui/core';
import { useState } from 'react';

import Item from '../marketplace-components/Item';

const Inventory = () => {

    const [item, setItem] = useState([]);

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };

    return (
        <div className="inventory-page">
            <div className='inventory-content'>
                <div className='inventory-header'>
                    <div className='selector-switch'>
                        <Button variant="contained" color="primary" className='selector-switch__button'>
                            Bought
                        </Button>
                        <Button variant="contained" color="primary" className='selector-switch__button'>
                            Selling
                        </Button>
                        <Button variant="contained" color="primary" className='selector-switch__button'>
                            Sold
                        </Button>
                        <br></br><br></br>
                    </div>
                    <div className='inventory-status'>
                        <Chip label="Showing Bought" onDelete={handleDelete} color="primary" variant="outlined" className='selector-switch__button' />
                        <Chip label="Showing Selling" onDelete={handleDelete} color="primary" variant="outlined" className='selector-switch__button' />
                        <br></br><br></br><br></br>
                    </div>
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
