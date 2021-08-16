import React from 'react'
import { Link } from 'react-router-dom';


const Project = ({db}) => {
    return (
        <div>
             <Link to="#">
                <h2>{db.properties.Name.title[0].plain_text}</h2>
            </Link>
            <p>{db.properties.description.rich_text[0].plain_text}</p>
        </div>
    )
}

export default Project
