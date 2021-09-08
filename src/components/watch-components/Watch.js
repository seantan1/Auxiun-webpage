import { Card, Grid } from "@material-ui/core";
import React from "react";
import { useContext } from "react";
import darkThemeContext from "../darkThemeContext";
import Item from '../marketplace-components/Item'

import "./css/Watch.css";

export default function Watch() {
    const { darkTheme } = useContext(darkThemeContext);

    return (
        <div className='watch-content'>
            <Card className='watch-card' style={{ backgroundColor: darkTheme ? '#424242' : '' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Item></Item>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
}
