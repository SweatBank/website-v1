import React from 'react';

const formRef = React.createRef();

const scrollToFormRef = () => {
  window.scrollTo({
    top: formRef.current.offsetTop,
    left: 0,
    behavior: 'smooth',
  });
}

const DEFAULT_EMAIL = '';

export function useRequestBetaForm() {
  const [email, setEmail] = React.useState(DEFAULT_EMAIL);

  const scrollToForm = () => {
    scrollToFormRef();
  }

  const clear = () => {
    setEmail(DEFAULT_EMAIL);
  }

  const isEmailValid = React.useMemo(() => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase());
    return isValid;
  }, [email]);

  return {
    formRef,
    scrollToForm,
    email,
    setEmail,
    isEmailValid,
    clear,
  };
}