import React from 'react'
import { Link } from 'react-router-dom';


const Project = ({db}) => {

    const _route = db.properties.Name.title[0].plain_text

    return (
        <div>
             <Link to={_route}>
                <h2>{db.properties.Name.title[0].plain_text}</h2>
            </Link>
            <p>{db.properties.description.rich_text[0].plain_text}</p>
        </div>
    )
}

export default Project
