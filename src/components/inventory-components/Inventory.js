import './css/Inventory.css';

import { Button, Card, Grid } from '@material-ui/core';

import Item from '../marketplace-components/Item';

const Inventory = () => {

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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Item />
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>


    );
}

export default Inventory;
