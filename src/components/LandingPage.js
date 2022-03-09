import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react';

const LandingPage = () => {
  return (
    <div className="landing-page">
        <p>Landing Page</p>
        </div>
  )
}

export default withAuthenticationRequired(LandingPage, {
    onRedirecting: () => <div>Loading...</div>
});