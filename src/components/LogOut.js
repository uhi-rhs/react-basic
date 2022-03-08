import React from 'react';
import { NavLink } from 'react-router-dom'

const LogOut = () => {
  return <div>
      <h2>You are now logged out. </h2>
      <NavLink to="/">
        <h4>Homepage</h4>
      </NavLink>
  </div>;
};

export default LogOut;