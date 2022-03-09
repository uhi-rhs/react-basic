import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import BlockContent from "@sanity/block-content-to-react"; 

const StoryPage3 = ({pageContent, nextPage, prevPage}) => {

    // const {plan1, text2} = pageContent;
    const plan1 = pageContent.plan1.asset.url
    const text2 = pageContent.text2

    const _continue = (e) => {
        e.preventDefault();
        nextPage();
    }

    const _back = e => {
        e.preventDefault();
        prevPage();
    };

    return (
        <div className="story-container">
             <button
                label="back"
                onClick={_back}
                className="btn-back"
            >
            <FaAngleLeft id="FaAngleRight" label="Next" style={{height: '5em', width: '2.5em', cursor: 'pointer'}}/>

            </button>
            <div className="story-card">
            <img src={plan1} alt="" />
            <BlockContent blocks={text2} projectId="1cepjwt9" dataset="production" className=""/>

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

export default StoryPage3