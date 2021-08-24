import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const StoryPage1 = ({pageContent, nextPage, prevPage}) => {

    const {name, client, intro} = pageContent;

    const _continue = (e) => {
        e.preventDefault();
        nextPage();
    }

    // Icon from react icons:
    // FaAngleLeft
    // FaAngleRight

    return (
        <div className="story-container">
            <div className="story-card">
            <h1>{name}</h1>
            <h3>{client}</h3>
            <p>{intro}</p>
            </div>
            <button
                label="continue"
                onClick={_continue}
                className="btn-next"
            >Next</button>
        </div>
    )
}

export default StoryPage1
