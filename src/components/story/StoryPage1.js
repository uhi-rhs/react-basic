import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

const StoryPage1 = ({pageContent, nextPage}) => {

    const {name, client, intro} = pageContent;

    const _continue = (e) => {
        e.preventDefault();
        nextPage();
    }

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
            >
                <FaAngleRight id="FaAngleRight" label="Next" style={{height: '5em', width: '2.5em', cursor: 'pointer'}}/>
            </button>
        </div>
    )
}

export default StoryPage1
