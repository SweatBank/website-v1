import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { useRequestBetaForm } from './hooks/useRequestBetaForm';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      align: 'center'
    },
  },
}));

const Email = ({ email, setEmail }) => {
  const { formRef } = useRequestBetaForm();
  const classes = useStyles();

  return (
    <form className={classes.root} ref={formRef} noValidate={false} autoComplete="off">
      <TextField id="standard-basic" label="Email" defaultValue={null} value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
    </form>
  );
};

export default Email;