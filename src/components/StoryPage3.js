import React from 'react'

const StoryPage3 = (pageContent, nextPage, prevPage) => {

    const {image2, text2} = pageContent;

    return (
        <div>
            <img src={image2} alt="" />
            <p>{text2}</p>
        </div>
    )
}

export default StoryPage3