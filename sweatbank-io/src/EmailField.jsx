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

const Email = ({ formRef, email, setEmail }) => {
  //const { formRef, email, setEmail } = useRequestBetaForm();
  // I would prefer to be able to use a hook here, but due to the way the components are organized, if we use a hook here,
  // only this component updates, and the Content component never re-renders. Therefore, when the isEmailValid state changes, 
  // it is never updated in the DOM. Ideally the field, and the button related to that field are paired so that only they have to be
  // redrawn. The current workaround is to re-render the Content component every time the input is changed.
  const classes = useStyles();

  return (
    <form className={classes.root} ref={formRef} autoComplete="off">
      <TextField
        id="standard-basic"
        label="Email"
        defaultValue={null}
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
    </form>
  );
};

export default Email;