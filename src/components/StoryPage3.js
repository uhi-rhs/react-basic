import React from 'react'

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
        <div>
            <img src={image2} alt="" />
            <p>{text2}</p>
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

export default StoryPage3