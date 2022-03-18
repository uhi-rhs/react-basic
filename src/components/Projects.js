import React from 'react'
import Project from './Project';
import {FaUsers, FaOtter, FaTractor} from 'react-icons/fa'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Projects = ({projects}) => {

    const {user} = useAuth0()

    // const [rhsUser] = useState(()=> {
    //     const saved = localStorage.getItem('_id');
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || ""
    //   })

    // if(!rhsUser){
    //     console.log("no user")
    // }else{
    //     console.log("send user to user page")
    // }
    
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

            {
                !user ? (<div>
                    <Link to={'/login'} label="user">     
                Login Page
             </Link>
                </div>) : null
            }

            {
                user ? <div className="greeting">
                    <h4>Hi {user.name}</h4>
                <p className="intro-text">Please head over to the user profile page to set up a profile. This will allow you to use the features in this app.</p>
                <Link to={'/user'} label="user">     
               Create Profile
                </Link></div> : <div></div>
            }

            {
                user ? <Link to={'/location'} label="user">     
                Consultation App
                 </Link>
                 : null
            }
            
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
