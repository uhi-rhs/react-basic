import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const StoryPageVideo = ({pageContent, prevPage}) => {

    const {text3, vimeolink} = pageContent

    // const [ url ] = useState(

    //     `<iframe src=${vimeolink} title='vimeo' width='640' height='360' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>`

    // )

    const _back = e => {
        e.preventDefault();
        prevPage();
    };

    console.log(vimeolink)

    return (
        <div className="story-container">
             <button
                label="back"
                onClick={_back}
                className="btn-back"
            >Back</button>
            <div className="story-card">
            <p>{text3}</p>
            
            <iframe src={vimeolink} title='vimeo' width='640' height='360' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>
            </div>

           
        </div>
    )
}

export default StoryPageVideo
