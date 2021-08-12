import React from 'react'

const Instructions = ({instructions}) => {
    const {header, item1, item2, body} = instructions
    return (
        <div className="instructions">
            <div className="instructions-header">
        <h2>{header}</h2>
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

export default Instructions
