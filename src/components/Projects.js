import React from 'react'
import Spinner from './Spinner'
import Project from './Project';

const Projects = ({dbs, isLoading, setLocation}) => {

   return isLoading? (
       <Spinner />
   ) :  (
        <div className="dbs-container">
            <h4>Projects</h4>
            {dbs.map((db) => (
                <div key={db.id}>
                    <Project db={db} setLocation={setLocation}/>
                </div>
            ))}
        </div>
    )
}

export default Projects
