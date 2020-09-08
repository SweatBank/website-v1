import React from 'react';
import { makeStyles } from '../../yarn-landing-page/src-bak/src/node_modules/@material-ui/core/styles';
import TextField from '../../yarn-landing-page/src/node_modules/@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      align: 'center'
    },
  },
}));

const Email = () => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Email" />
    </form>
  );
};

export default Email;