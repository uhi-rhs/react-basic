import React from 'react'
import { Link } from 'react-router-dom';
import AuthenticationButton from './AuthenticationButton'


const Login = () => {
  return (
    <main className="user-main">
        <Link to={'/'} label="home">Back</Link>
    <div className="login">
    
    <AuthenticationButton /> 
    
</div>
    </main>
  )
}

export default Login