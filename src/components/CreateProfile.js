import React, {useState, useEffect} from 'react';
import sanityClient from '../writeClient.js'
// import { uuid } from 'uuidv4';
// import {useHistory} from "react-router-dom"

const CreateProfile = ({user, setRhsUser}) => {
        // Create Profile State
        const [project, setProject] = useState()
        const [username, setUsername] = useState("")
        const [connection, setConnection] = useState("")
        // const [submission, setSubmission] = useState(null)
        const [submitted, setSubmitted] = useState(false)

        // const formatSlug = (text) => {
        //     return text.replace(/ /g, "-")
        //     // write a more comprehensive slugify function to exclude problem chars
        // }

        const [projects, setProjects] = useState(null)

        const saveSubmission = () => {
            const submission = {
                _type: 'user',
                username: username,
                email: user.email,
                auth_id: user.sub.slice(6),
                slug: {
                    current: parseInt(1000000000 * Math.random()).toString()
                },
                connection: connection,
                project: {
                    _type: 'reference',
                    _ref: project
                }
            }
            console.log(submission)
            sanityClient.create(
                submission
            )
            setRhsUser(submission)
        }
        console.log(username)
        console.log(connection)
        console.log(project)

        // Query for project info
        useEffect(()=> {
          sanityClient
          .fetch(`*[_type == "project"]{
            name,
            slug,
            _id,
            location->{
              name,
              description,
              _id
            }
          }`)
          .then((data) => setProjects(data))
          .catch(console.error)
        },[])

            // Form Functions

    const handleProject = (e) => {
        e.preventDefault()
        setProject(e.target.value)
    }

    const handleUsername = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleConnection = (e) => {
        e.preventDefault()
        setConnection(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!username){
            alert('Please add a username')
            return
        }
        if(!project){
            alert('Please choose a location')
            return
        }
        saveSubmission()
        setProject()
        setSubmitted(true)
    }

    console.log(projects)

  return submitted ? <div>Profile Created  </div> : (
    <div className="profile">
    <form onSubmit={handleSubmit}>
        <label>
            Username you are happy to have other users see next to your comments:
            <input type="text" value={username} onChange={handleUsername}/>

        </label>

        <label>
            Choose a location (it should be relevant / local to you)
            </label>
        <select name="" id="" value={project} onChange={handleProject}>
            <option value="">Please choose an option</option>
            {projects && projects.map((project, index)=>(
                <option value={project._id} key={project.slug.current}>{project.name}</option>
            ))}
            </select>
        
        <label htmlFor="">
           {project ? <div><p>Please tell us about your connection to this location</p> <textarea onChange={handleConnection}/></div>: null} 
        </label>
        <button>
            <input type="submit" value="Submit"/>
        </button>
        </form>
</div>
  )
}

export default CreateProfile
  