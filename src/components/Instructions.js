import React, {useState} from 'react'
import {FaAngleDown} from 'react-icons/fa'
import {FaAngleUp} from 'react-icons/fa'

const Instructions = ({instructions}) => {
    
    const {header, item1, item2, body} = instructions

    const [display, setDisplay] = useState(true)

    const handleClick = () => {
        setDisplay(!display)
    }

    // Add some error handling for when one of the props isn't supplied

    if (!display) {
    return (
        <div className="instructions">
            <div className="instructions-header">
            <h2>{header}</h2>
            <button onClick={handleClick}><FaAngleDown id="InstructionsOpen" label="Back" style={{height: '1em', width: '1em', cursor: 'pointer'}}/></button>
            </div>
        </div>
    )}else{
        return (
            <div className="instructions">
                <div className="instructions-header">
            <h2>{header}</h2>
            <button onClick={handleClick}><FaAngleUp id="InstructionsClose" label="Back" style={{height: '1em', width: '1em', cursor: 'pointer'}}/></button>
            </div>
            <ul>
                <li>
                    {item1}
                </li>
                <li>
                    {item2}
                </li>
            </ul>
            <p>{body}</p>
        </div>
        )
    }
}

export default Instructions
