import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const LogOutButton = () => {

    const { logout } = useAuth0();


  return <button
  className=""
    onClick={()=> logout({
        returnTo: window.location.origin,
    })}
    name="logout button"
    aria-label="logout button"
  >
      Log out
  </button>;
};

export default LogOutButton;
