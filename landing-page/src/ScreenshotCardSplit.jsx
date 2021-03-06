import React from 'react';
import { makeStyles } from '../../yarn-landing-page/src-bak/src/node_modules/@material-ui/core/styles';
import Card from '../../yarn-landing-page/src/node_modules/@material-ui/core/Card';
import CardActions from '../../yarn-landing-page/src/node_modules/@material-ui/core/CardActions';
import CardContent from '../../yarn-landing-page/src/node_modules/@material-ui/core/CardContent';
import Button from '../../yarn-landing-page/src/node_modules/@material-ui/core/Button';
import Typography from '../../yarn-landing-page/src/node_modules/@material-ui/core/Typography';

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

const ScreenshotCardSplit = (props) => {
    
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const { view } = props;
    return (
        <Card 
        className={classes.root}
        align = 'center'>
          <img src = {view} className = 'screenshotSplit' />
        </Card>
      );
}

export default ScreenshotCardSplit;
