import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import BlockContent from "@sanity/block-content-to-react"; 

const StoryPageVideo = ({pageContent, prevPage}) => {


    const text3 = pageContent.text3
    const vimeolink = pageContent.videoUrl

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
                <BlockContent blocks={text3} projectId="1cepjwt9" dataset="production" className=""/>

                 <iframe src={vimeolink} id="vimeo" title='vimeo' width='640' height='360' frameBorder='0' allow='autoplay; fullscreen; picture-in-picture' allowFullScreen></iframe>
            </div>        
        </div>
    )
}

export default StoryPageVideo
