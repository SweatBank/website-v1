import React from 'react';
import 'fontsource-roboto';
import { useSnackbar } from 'notistack';

import Scroll from './Scroll'

import { Grid, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { useRequestBetaForm } from './hooks/useRequestBetaForm';
import { RequestBetaService } from './services/requestBetaService';

import appIcon from './appIconRounded2.svg';
import view1 from './png/view1.png';
import view2 from './png/view2.png';
import view3 from './png/view3.png';
import view4 from './png/view4.png';
import view5 from './png/view5.png';
import view6 from './png/view6.png';
import view7 from './png/view7.png';
import view8 from './png/view8.png';

import ScreenshotCard from './ScreenshotCard';
import ScreenshotCardSplit from './ScreenshotCardSplit';
import Email from './EmailField';

const useStyles = makeStyles({
    aboutSweatBankStyle: {
      alignText: 'center',
      fontFamily: 'roboto', 
      color: '#404040'       
    },
    extraDetailStyle: {
        fontFamily: 'roboto',
        fontSize: 'calc(5px + 1.5vw)',
        color: '#404040' 
      },
      topQuoteStyle: {
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 'calc(16px + 2.8vw)',
        color: '#404040' 
      },
      signUpStyle: {
        fontFamily: 'roboto',
        fontSize: 'calc(7px + 1.2vw)',
        fontStyle: 'underline',
        color: 'primary' 
      },
      sweatBankButtonStyle: {
        paddingRight: 'calc(30px + .5vw)', paddingLeft: 'calc(30px + .5vw)',
      },
      emailGridItemStyle: {
        paddingTop: '40px',
        alignText: 'center',
        align: 'center'
      }
  });

const Content = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const {
        scrollToForm,
        formRef,
        email,
        setEmail,
        isEmailValid,
        clear,
    } = useRequestBetaForm();

    const onSubmitRequestBeta = (e) => {
        e.preventDefault();
        
        if (!isEmailValid) {
            // This should never be reached
            return;
        }

        const { success, message } = RequestBetaService.requestBetaByEmail(email);

        if (success) {
            enqueueSnackbar('Thanks for signing up!', {
                variant: 'success'
            });
            clear();
        } else {
            enqueueSnackbar(message, {
                variant: 'error'
            });
        }
    }

    return(
    <React.Fragment>
    <Scroll showBelow = {250}/>    
    <Grid 
        container 
        spacing = {2}
        justify = 'space-evenly'
        // alignItems = "center"
    >

            {/* <Grid 
                item xs ={12} 
                justify="space-evenly">
                <img src = {appIcon} className = 'appIcon' />
            </Grid> */}
            
            <Grid item xs ={12} >
                <br/>
                <br/>
                <br/>
                <br/>
                <Typography
                className = {classes.topQuoteStyle}
                // variant = 'h5'
                color = 'primary'>
                Sweat. Log. Repeat.
                </Typography>
                <br/>
                <Typography
                className = {classes.signUpStyle}
                color = 'primary'>
                <Link href="" onClick={(e) => {
                    e.preventDefault();
                    scrollToForm();
                }}>
                    sign up for our beta (coming September 2020)
                </Link>
                </Typography>
                <br/>
                <br/>
                <br/>
                <br/>
            </Grid>

            <Grid item xs ={4} >
                <Typography
                className = {classes.extraDetailStyle}
                // variant = 'h4'
                color = 'primary'>
                Set up to three goals at a time and focus on seeing them through.
                </Typography>
            </Grid>

            <Grid item xs ={4} >
                <ScreenshotCard view = {view1} />
            </Grid>

            <Grid item xs ={4} >
                <ScreenshotCard view = {view2} />
            </Grid>

            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            {/* empty grids */}

            <Grid item xs ={4} >
                <ScreenshotCardSplit view = {view3} />
            </Grid>

            <Grid item xs ={4} >
                <ScreenshotCardSplit view = {view4} />
            </Grid>

            <Grid item xs ={4} >
                <Typography
                className = {classes.extraDetailStyle}
                // variant = 'h4'
                color = 'primary'
                align = 'right'>
                Analyze your goal history and activity levels to become a better goal-setter.
                </Typography>
            </Grid>

            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            {/* empty grids */}

            <Grid item xs ={4} >
                <Typography
                className = {classes.extraDetailStyle}
                // variant = 'h4'
                color = 'primary'>
                Take a few minutes each day to check in and reflect on your progress.
                </Typography>
            </Grid>

            <Grid item xs ={4} >
                <ScreenshotCard view = {view5} />
            </Grid>

            <Grid item xs ={4} >
                <ScreenshotCard view = {view6} />
            </Grid>

            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            {/* empty grids */}

            <Grid item xs ={4} >
                <ScreenshotCard view = {view7} />
            </Grid>

            <Grid item xs ={4} >
                <ScreenshotCard view = {view8} />
            </Grid>

            <Grid item xs ={4} >
                <Typography
                className = {classes.extraDetailStyle}
                // variant = 'h4'
                color = 'primary'
                align = 'right'>
                Build momentum and support your friends.
                </Typography>
            </Grid>

            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            {/* empty grids */}            

            <Grid 
                className = {classes.emailGridItemStyle}
                item xs ={12} 
                justify="space-evenly"
                align = 'center'>
                <br/><br/><br/>
                <Email
                    formRef={formRef}
                    email={email}
                    setEmail={setEmail}
                />
                <br/>
            </Grid>

            <Grid 
                item xs ={12} 
                justify="space-evenly"
                align = 'center'>
                <Button
                    className = {classes.sweatBankButtonStyle}
                    variant = 'contained'
                    color = 'primary'
                    disabled = {isEmailValid === false}
                    onClick={(e) => onSubmitRequestBeta(e)}
                    size = 'medium'
                    >
                    request beta
                </Button>
                <br/><br/><br/><br/>
            </Grid>
            
            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            <Grid item xs ={12} /> 
            {/* empty grids */}    
            
            {/* <Grid 
                item xs ={12} 
                justify="space-evenly">
                <img src = {appIcon} className = 'appIcon' />
            </Grid> */}

        </Grid>
        </React.Fragment>
        

        
    ) 
};

export default Content;