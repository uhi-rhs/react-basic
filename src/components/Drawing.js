import React, {useState} from 'react'
// import fishermans from '../images/fishermans-station.png'
import PageHeader from './PageHeader'
import DrawingArea from './DrawingArea'

const Drawing = () => {

    const [pageInfo] = useState({
        title: "Drawing on a Plan Demo",
        body: "Testing out how users might draw on a plan to add comments"
    })

    return (
        <div className="container">
            <PageHeader info={pageInfo}/>

            <div className="drawing-container">
            
            <div className="plan-area">
            {/* <img src={fishermans} alt="" /> */}
            <DrawingArea />
            </div>

          
            </div>

           
        </div>
    )
}

export default Drawing
