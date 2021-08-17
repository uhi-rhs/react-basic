import React from 'react'

const StoryPage2 = ({pageContent, nextPage, prevPage}) => {

    const {image1, text1} = pageContent;

    return (
        <div>
            <img src={image1} alt="" />
            <p>{text1}</p>
        </div>
    )
}

export default StoryPage2
