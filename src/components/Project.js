import React from 'react'
import { Link } from 'react-router-dom';
import useLocalStorage from "../useLocalStorage";


const Project = ({db, setLocation}) => {
    
    // Set location to local storage 
    const {localLocation, setLocalLocation} = useLocalStorage("location", "")

    const id = db.properties.Name.title[0].plain_text

    const clickHandler = () => {
        setLocation(db)
        // setLocalLocation(db)
       
    }

    return (
        <div>
             <Link to={`/location/${id}`} onClick={() => clickHandler(db)}>
                <h2>{db.properties.Name.title[0].text.content}</h2>
            </Link>
            <p>{db.properties.description.rich_text[0].plain_text}</p>
        </div>
    )
}

export default Project
