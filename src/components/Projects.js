import React from 'react'
import Spinner from './Spinner'
import Project from './Project';

const Projects = ({dbs, isLoading}) => {

   return isLoading? (
       <Spinner />
   ) :  (
        <div className="dbs-container">
            <h4>Projects</h4>
            {console.log(dbs)}
            {dbs.map((db) => (
                <div key={db.id}>
                    <Project db={db}/>
                </div>
            ))}
        </div>
    )
}

export default Projects
