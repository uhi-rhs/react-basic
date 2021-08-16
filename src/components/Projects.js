import React from 'react'
import Spinner from './Spinner'
import Project from './Project';
import { Link } from 'react-router-dom';

const Projects = ({dbs, isLoading}) => {

   return isLoading? (
       <Spinner />
   ) :  (
        <div className="dbs-container">
            <h4>Projects</h4>
            {console.log(dbs)}
            {dbs.map((db) => (
                <div key={db.id}>
                    {/* <Link to="#">
                    <h2>{db.properties.Name.title[0].plain_text}</h2>
                    </Link>
                    <p>{db.properties.description.rich_text[0].plain_text}</p> */}
                    <Project db={db}/>
                </div>
            ))}
        </div>
    )
}

export default Projects
