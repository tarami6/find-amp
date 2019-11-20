import React, {Fragment} from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

const Header = props => {
    return (
        <AppBar style={{width: "100%"}} position="static">
            <Toolbar>
                <Typography variant="h6">מצא קספומט</Typography>
            </Toolbar>
        </AppBar>
    );
};


export default Header;
