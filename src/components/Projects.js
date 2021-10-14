import React from 'react'
import Spinner from './Spinner'
import Project from './Project';
import {FaMugHot, FaUsers, FaOtter, FaTractor} from 'react-icons/fa'

const Projects = ({dbs, isLoading, setLocation}) => {

   return isLoading? (
       <Spinner />
   ) :  (
        <div className="dbs-container">
            <div>
            <h1>Community Engagement Portal</h1>
            <div className="icon-container">
                <FaMugHot id="FaMugHot" label="Mug" style={{height: '3em', width: '3em'}}/>
                <FaUsers id="FaUsers" label="Users" style={{height: '3em', width: '3em'}}/>
                <FaOtter id="FaOtter" label="Otter" style={{height: '3em', width: '3em'}}/>
                <FaTractor id="FaTractor" label="Tractor" style={{height: '3em', width: '3em'}}/>
            </div>

            <p>Some more information...</p>
            <h2>Projects:</h2>
            </div>
            
        
            {dbs.map((db) => (
                <div key={db.id}>
                    <Project db={db} setLocation={setLocation}/>
                </div>
            ))}
        </div>
    )
}

export default Projects
