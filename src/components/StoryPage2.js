import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const StoryPage2 = ({pageContent, nextPage, prevPage}) => {

    const {image1, text1} = pageContent;

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
            >Back</button>
            <div className="story-card">
            <img src={image1} alt="" />
            <p>{text1}</p>
            </div>
           
            <button
                label="continue"
                onClick={_continue}
                className="btn-next"
            >Next</button>
             
        </div>
    )
}

export default StoryPage2
