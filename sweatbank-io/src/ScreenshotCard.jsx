import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    width: '22.2222222vw',
  },
  bullet: {
    display: 'inline-block',
    // margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    // fontSize: 14,
  },
  pos: {
    // marginBottom: 12,
  },
});

const ScreenshotCard = (props) => {
    
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const { view } = props;
    return (
        <Card 
        className={classes.root}
        align = 'center'>
          <img src = {view} className = 'screenshot' />
        </Card>
      );
}

export default ScreenshotCard;
