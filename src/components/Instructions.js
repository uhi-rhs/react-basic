import React, {useState} from 'react'

const Instructions = ({instructions}) => {
    const {header, item1, item2, body} = instructions

    const [display, setDisplay] = useState(true)

    const handleClick = () => {
        setDisplay(!display)
    }

    if (!display) {
    return (
        <div className="instructions">
            <div className="instructions-header">
            <h2>{header}</h2>
            </div>
            <button onClick={handleClick}>^</button>
        </div>
    )}else{
        return (
            <div className="instructions">
                <div className="instructions-header">
            <h2>{header}</h2>
            </div>
            <button onClick={handleClick}>^</button>
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
