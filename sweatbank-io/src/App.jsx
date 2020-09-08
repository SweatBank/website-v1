import React, { useRef } from 'react';
import { SnackbarProvider } from 'notistack';

import { Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Content from './Content';

import './styles.css';

// this is how we overwrite MUI styles
const useStyles = makeStyles({
  timeToSweatStyle: {
    // fontStyle: 'oblique',
    // color: props => props.color,
  },
});

const App = () => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin ={{ horizontal: 'center', vertical: 'top' }}
    >
      <Grid container direction = 'column'>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs ={2} sm ={2} />
        <Grid item xs = {8} sm = {8} >
          <Content />
        </Grid>
        <Grid item xs ={2} sm ={2} />
      </Grid>
    </Grid>
    </SnackbarProvider>
  );
}

export default App;