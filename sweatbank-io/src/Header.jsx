import React from 'react';
import 'fontsource-roboto';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import droplet from './whitedroplet.svg';
import SB_Logo from './logo.svg';

import { useRequestBetaForm } from './hooks/useRequestBetaForm';

const useStyles = makeStyles(() => ({
    typographyStyles: {
        fontFamily: 'roboto',
        fontSize: '26px',
        flex: 1
    },
    headerButtonStyle: {
        '&:hover':{
            // color: '#E2DBE2'
        }
    }
}));

const Header = () => {
    const { scrollToForm } = useRequestBetaForm();
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
                onClick={() => scrollToForm()}
                // variant = 'text'
                // disableElevation
                disableElevation
                disableRipple = {true}
                disableFocusRipple = {true}>
                    request beta
            </Button>
        </Toolbar>
    </AppBar>
    );
};

export default Header;