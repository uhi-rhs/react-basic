import React from 'react'

const StoryPageVideo = ({pageContent, nextPage, prevPage}) => {

    const {text3, vimeolink} = pageContent

    return (
        <div>
            <p>{text3}</p>
            <iframe src={vimeolink} title="vimeo" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
}

export default StoryPageVideo
