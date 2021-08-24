import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const StoryPage3 = ({pageContent, nextPage, prevPage}) => {

    const {image2, text2} = pageContent;

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
            <FaAngleLeft id="FaAngleRight" label="Next" style={{height: '5em', width: '3em', cursor: 'pointer'}}/>

            </button>
            <div className="story-card">
            <img src={image2} alt="" />
            <p>{text2}</p>
            </div>
           
            <button
                label="continue"
                onClick={_continue}
                className="btn-next"
            >
            <FaAngleRight id="FaAngleRight" label="Next" style={{height: '5em', width: '3em', cursor: 'pointer'}}/>

            </button>
        </div>
    )
}

export default StoryPage3