import React from 'react'
import AuthenticationButton from './AuthenticationButton'
import { useAuth0 } from '@auth0/auth0-react';

import { Link } from 'react-router-dom';

export default function Intro() {

    const { isAuthenticated } = useAuth0()

    return (
        <div className="intro">
            <Link to={'/'} label="home">
            <img src="RHS_White_Light-1.png" alt="" className="intro-image"/>
            </Link>
            {
                isAuthenticated ? <AuthenticationButton /> :  <Link to={'/user'} label="user">     
                Login
             </Link>
            }
        </div>
    )
}
