import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import Spinner from '../Spinner'
import BlockContent from "@sanity/block-content-to-react"; 

const StoryPage1 = ({pageContent, nextPage}) => {

    console.log(pageContent)
    // const {name, client, intro} = pageContent;
    const name = pageContent.name
    const client = pageContent.client
    const intro = pageContent.intro

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
            <BlockContent blocks={intro} projectId="1cepjwt9" dataset="production" className=""/>

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
