import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import BlockContent from "@sanity/block-content-to-react"; 

const StoryPage2 = ({pageContent, nextPage, prevPage}) => {

    // const {image1, text1} = pageContent;
    const image1 = pageContent.image.asset.url
    const text1 = pageContent.text1

    const _continue = (e) => {
        e.preventDefault();
        nextPage();
    }

    const _back = e => {
        e.preventDefault();
        prevPage();
    };
    console.log("Step 2 page content",pageContent)
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
            <img src={image1} alt="" />
            {/* <p>{text1}</p> */}
            <BlockContent blocks={text1} projectId="1cepjwt9" dataset="production" className=""/>

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

export default StoryPage2
