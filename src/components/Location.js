import React from 'react'
import { useLocation } from 'react-router-dom'

const Location = () => {

    const id = useLocation()
    let formattedUrl = id.pathname.slice(10)

    // do new query to the backend using the id as a parameter

    return (
        <div>
            <h1>Hi it's a location</h1>
            <p>{formattedUrl}</p>
        </div>
    )
}

export default Location
