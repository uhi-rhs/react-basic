import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import Spinner from '../Spinner'

const StoryPage1 = ({pageContent, nextPage}) => {

    // const {name, client, intro} = pageContent;
    const name = pageContent.properties.Name.title[0].plain_text
    const client = pageContent.properties.client.rich_text[0].plain_text
    const intro = pageContent.properties.intro.rich_text[0].plain_text

    // console.log("page content:",pageContent)

    const _continue = (e) => {
        e.preventDefault();
        nextPage();
    }

    return pageContent === null ? ( <Spinner />
        ) : (
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
