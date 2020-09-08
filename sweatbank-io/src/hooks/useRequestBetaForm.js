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

  return {
    formRef,
    scrollToForm,
    email,
    setEmail,
    clear,
  };
}