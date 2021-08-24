import React from 'react'

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
        <div>
            <img src={image1} alt="" />
            <p>{text1}</p>
            <button
                label="back"
                onClick={_back}
            >Back</button>
            <button
                label="continue"
                onClick={_continue}
            >Next</button>
             
        </div>
    )
}

export default StoryPage2
