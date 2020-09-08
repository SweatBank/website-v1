import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      align: 'center'
    },
  },
}));

const Email = ({ setEmail, emailFormRef }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} ref={emailFormRef} noValidate autoComplete="off">
      <TextField id="standard-basic" label="Email" onChange={(e) => setEmail(e.currentTarget.value)}/>
    </form>
  );
};

export default Email;