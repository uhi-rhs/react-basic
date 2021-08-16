import React from 'react'
import spinner from '../images/spinner.gif'

const Spinner = () => {
    return (
        <img src={spinner} style={{ width: '70px', margin: 'auto', display: 'block'}} alt='Loading'/>
    )
}

export default Spinner
