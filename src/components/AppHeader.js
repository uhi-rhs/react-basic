import React from 'react'
import AuthenticationButton from './AuthenticationButton'

import { Link } from 'react-router-dom';
const AppHeader = () => {
  return (
    <div className="intro">
    <Link to={'/'} label="home">
    <img src="RHS_White_Light-1.png" alt="" className="intro-image"/>
    </Link>
    
    <AuthenticationButton /> 
    
</div>
  )
}

export default AppHeader