import React from 'react'
import Project from './Project';
import {FaUsers, FaOtter, FaTractor} from 'react-icons/fa'

const Projects = ({projects}) => {
    
    if(!projects) return <div>Loading...</div>
   return (
        <div className="dbs-container">
            <div className="home-page">
            <h1>🎉Community Engagement Portal🎉*Beta</h1>
            <div className="icon-container">
                <FaUsers id="FaUsers" label="Users" style={{height: '3em', width: '3em'}}/>
                <FaOtter id="FaOtter" label="Otter" style={{height: '3em', width: '3em'}}/>
                <FaTractor id="FaTractor" label="Tractor" style={{height: '3em', width: '3em'}}/>
            </div>

            <p>Welcome to the Rural Housing Scotland Community Engagement Portal. You can use this tool to be involved in the new affordable housing project at [insert community name]. Please log in if you have an account or register and follow the instructions so that you can have your say!</p>

            <h2>Current Projects:</h2>
            </div>
            
            {projects.map((project) => (
                
                <div key={project.slug.current}>
                    {console.log(project)}
                    <Project project={project}/>
                </div>
            ))}
        </div>
    )
}

export default Projects
