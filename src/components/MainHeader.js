import React from 'react'
import { Link } from 'react-router-dom'

const MainHeader = () => {

    return (
        <div className="link-container">
            <h1>Demo Features </h1>
             {/* <Link to={"/drop_marker"}>
            <h2>Drop Marker</h2>               
            </Link> */}
            {/* <Link to={"/marker_comment"}>
            <h2>Marker Comment</h2>
            </Link>  */}
            {/* <Link to={"/view_locations"}>
            <h2>View Locations</h2>
            </Link> */}
            {/* <Link to={"/draggable_marker"}>
            <h2>Draggable Marker</h2>
            </Link> */}
            {/* <Link to={"/view_pi_comments"}>
            <h2>View PostIt Comments</h2>
            </Link>  */}
            {/* <Link to={"/gallery"}>
            <h2>Gallery</h2>
            </Link>  */}
            {/* <Link to={"/houses"}>
            <h2>Houses</h2>
            </Link>  */}
            {/* <Link to={"/site_layout"}>
            <h2>Site Layout</h2>
            </Link>  */}
            {/* <Link to={"/form_view"}>
                <h2>Form</h2>
            </Link> */}
            {/* <Link to={"/form_responses"}>
                <h2>Form Responses</h2>
            </Link> */}
            {/* <Link to={"/story_example"}>
                <h2>Story Example</h2>
            </Link> */}
            {/* <Link to={"/landing_page"} >
                <h2>Landing Page Example</h2>
            </Link> */}
            <Link to={"/drawing"} >
                <h2>Drawing</h2>
                <p>Demo of a feature to add for users. Needs better plan image(s)</p>
            </Link>
            <Link to={"/site_proposal_national"} >
                <h2>Propose Site</h2>
                <p>Where a user can initiate a new site with RHS</p>
            </Link>
            <Link to={"/draw_polygon"} >
                <h2>Draw Polygon</h2>
                <p>For RHS staff to define a site boundary for use in another part of the consultation</p>
            </Link>
            <Link to={"/draw_polygon_basic"} >
                <h2>Draw Polygon 2</h2>
                <p>For RHS staff to define a site boundary for use in another part of the consultation</p>

            </Link>
        </div>
    )
}

export default MainHeader
