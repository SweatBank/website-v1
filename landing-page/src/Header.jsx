import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '../../yarn-landing-page/src-bak/src/node_modules/@material-ui/core';
import { makeStyles } from '../../yarn-landing-page/src-bak/src/node_modules/@material-ui/core/styles';
import '../../yarn-landing-page/src/node_modules/fontsource-roboto';

import droplet from './whitedroplet.svg';
import SB_Logo from './logo.svg';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        fontFamily: 'roboto',
        fontSize: '26px',
        flex: 1
    },
    headerButtonStyle: {
        // focus: 'roboto',
        // fontSize: '26px',
        // flex: 1
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
    <AppBar position = "static">
        <Toolbar>
           {/* <img src = {SB_Logo} className = {classes.typographyStyles} /> */}
            <Typography className = {classes.typographyStyles}>
                SweatBank
                <img src = {droplet} />
            </Typography>
            <Button 
                className = {classes.headerButtonStyle}
                color="inherit"
                disableRipple = {true}
                disableFocusRipple = {true}>
                    request beta
            </Button>
        </Toolbar>
    </AppBar>
    );
};

export default Header;