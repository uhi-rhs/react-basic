import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'

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
            >
            <FaAngleLeft id="FaAngleRight" label="Next" style={{height: '5em', width: '2.5em', cursor: 'pointer'}}/>

            </button>
            <div className="story-card">
            <p>{text3}</p>
            
            <iframe src={vimeolink} id="vimeo" title='vimeo' width='640' height='360' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen></iframe>
            </div>

           
        </div>
    )
}

export default StoryPageVideo
