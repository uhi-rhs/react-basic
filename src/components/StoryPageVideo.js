import React, {useState} from 'react'

const StoryPageVideo = ({pageContent, prevPage}) => {

    const {text3, vimeolink} = pageContent

    const [ url ] = useState(

        `<iframe src=${vimeolink} title='vimeo' width='640' height='360' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>`

    )

    const _back = e => {
        e.preventDefault();
        prevPage();
    };

    console.log(vimeolink)

    return (
        <div>
            <p>{text3}</p>
            {url}
            <button
                label="back"
                onClick={_back}
            >Back</button>
        </div>
    )
}

export default StoryPageVideo
