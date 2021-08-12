import React from 'react'
import { Link } from 'react-router-dom'

const MainHeader = () => {

    return (
        <div className="link-container">
             <Link to={"/drop_marker"}>
            <h2>Drop Marker</h2>               
            </Link>
            <Link to={"/marker_comment"}>
            <h2>Marker Comment</h2>
            </Link> 
            <Link to={"/view_locations"}>
            <h2>View Locations</h2>
            </Link>
            <Link to={"/draggable_marker"}>
            <h2>Draggable Marker</h2>
            </Link>
            <Link to={"/view_pi_comments"}>
            <h2>View PostIt Comments</h2>
            </Link> 
            <Link to={"/gallery"}>
            <h2>Gallery</h2>
            </Link> 
            <Link to={"/houses"}>
            <h2>Houses</h2>
            </Link> 
        </div>
    )
}

export default MainHeader
