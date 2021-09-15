import React from 'react'
import { Link } from 'react-router-dom';


const Project = ({db}) => {
    
    const id = db.id
    return (
        <div>
             <Link to={`/location/${id}`} >
                <h2>{db.properties.Name.title[0].text.content}</h2>
            </Link>
            <p>{db.properties.description.rich_text[0].plain_text}</p>
            {/* <p>{db.properties.Name.title[0].text.content}</p> */}
        </div>
    )
}

export default Project
