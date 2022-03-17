import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'

const LogOutButton = () => {

    const { logout } = useAuth0();
console.log(window.location.origin)

  return <button
  className="log-btn" id="log"
    onClick={()=> logout({
        returnTo: window.location.origin+"/logout",
    })}
    name="logout button"
    aria-label="logout button"
  >
      Log out
  </button>;
};

export default LogOutButton;
