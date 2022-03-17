import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {

    const { loginWithRedirect } = useAuth0()

  return <button 
  
  className="log-btn"
  onClick={() => loginWithRedirect()}
  name="login button"
    aria-label="login button"
  >
      Login
  </button>;
};

export default LoginButton;