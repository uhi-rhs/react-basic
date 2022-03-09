import React from 'react'
// import { Link } from 'react-router-dom';
// import useLocalStorage from "../useLocalStorage";


const Project = ({project}) => {
    
    // Set location to local storage 

    // const id = db.properties.Name.title[0].plain_text

    // const clickHandler = () => {
    //     setLocation(db)
    //     setLocalLocation(db)
       
    // }
    
    console.log(project)

    return (
        <div>
             {/* <Link to={`/location/${id}`} onClick={() => clickHandler(db)}> */}
                <h2>{project.name}</h2>
                <h4>{project.location.description}</h4>
            {/* </Link> */}
            {/* <p>{db.properties.description.rich_text[0].plain_text}</p> */}
        </div>
    )
}

export default Project
