import React from 'react';
import 'fontsource-roboto';
import { Grid, Button, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import * as emailjs from 'emailjs-com';

import ScreenshotCard from './ScreenshotCard';
import ScreenshotCardSplit from './ScreenshotCardSplit';
import Email from './EmailField';

import appIcon from './appIconRounded2.svg';
import view1 from './png/view1.png';
import view2 from './png/view2.png';
import view3 from './png/view3.png';
import view4 from './png/view4.png';
import view5 from './png/view5.png';
import view6 from './png/view6.png';
import view7 from './png/view7.png';
import view8 from './png/view8.png';

const Content = ({ emailFormRef, scrollToEmailForm }) => {
    
    const preventDefault = (event) => event.preventDefault();
    const useStyles = makeStyles({
        aboutSweatBankStyle: {
          alignText: 'center',
          fontFamily: 'roboto', 
          color: '#404040'       
        },
        extraDetailStyle: {
            fontFamily: 'roboto',
            fontSize: 'calc(8px + 1.5vw)',
            color: '#404040' 
          },
          topQuoteStyle: {
            fontFamily: 'roboto',
            fontWeight: 'bold',
            fontSize: 'calc(10px + 1.6vw)',
            color: '#404040' 
          },
          signUpStyle: {
            fontFamily: 'roboto',
            fontSize: 'calc(12px + 0.7vw)',
            fontStyle: 'underline',
            color: 'primary' 
          },
          sweatBankButtonStyle: {
            // borderRadius: '100px',
            // paddingTop: '65px', paddingBottom: '65px',
            paddingRight: 'calc(30px + .5vw)', paddingLeft: 'calc(30px + .5vw)',
          },
          emailGridItemStyle: {
            paddingTop: '40px',
            alignText: 'center',
            align: 'center'
          }
      });
      
    const classes = useStyles();

    const [email, setEmail] = React.useState(null);

    const onSubmitRequestBeta = (e) => {
        e.preventDefault()
    
        let templateParams = {
            email: email,
            to_name: 'sweatbankapp@gmail.com',
            subject: 'BETA Requested',
        };
        emailjs.send(
        'gmail_service',
        'template_beta',
         templateParams,
        'user_NOMrgBHUx47Vs2iPFPdoV'
        );
        console.log(`A Beta request was successfully submitted for: ${email}`);
    }

    return(
    <React.Fragment>
    
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
                Exercising regularly is hard, but simple. <br/>
                We think your fitness app should be too.
                </Typography>
                <br/>
                <Typography
                className = {classes.signUpStyle}
                color = 'primary'>
                <Link href="" onClick={(e) => {
                    e.preventDefault();
                    scrollToEmailForm();
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
                    setEmail={setEmail}
                    emailFormRef={emailFormRef}
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
                    disabled = {false}
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