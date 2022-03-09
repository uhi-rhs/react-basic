import React from 'react'
import AuthenticationButton from './AuthenticationButton'
import { Link } from 'react-router-dom';

export default function Intro() {

    return (
        <div className="intro">
            <Link to={'/'} label="home">
            <img src="RHS_White_Light-1.png" alt="" className="intro-image"/>
            </Link>
            {/* <button className="btn-intro">Log in</button> */}
            <AuthenticationButton />
        </div>
    )
}
