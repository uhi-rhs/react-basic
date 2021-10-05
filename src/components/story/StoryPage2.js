import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const StoryPage2 = ({pageContent, nextPage, prevPage}) => {

    // const {image1, text1} = pageContent;
    const image1 = pageContent.location.properties.mainImage.files[0].file.url
    const text1 = pageContent.location.properties.text_1.rich_text[0].plain_text

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
            <img src={image1} alt="" />
            <p>{text1}</p>
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
