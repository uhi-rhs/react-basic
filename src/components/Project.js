import React from 'react'
import { Link } from 'react-router-dom';


const Project = ({db, setLocation}) => {
    const id = db.properties.Name.title[0].plain_text
    return (
        <div>
             <Link to={`/location/${id}`} onClick={setLocation(db)}>
                <h2>{db.properties.Name.title[0].text.content}</h2>
            </Link>
            <p>{db.properties.description.rich_text[0].plain_text}</p>
        </div>
    )
}

export default Project
