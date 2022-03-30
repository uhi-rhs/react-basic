import React, {useState, useEffect} from 'react';
import sanityClient from '../writeClient.js'
import {FaAngleRight} from 'react-icons/fa'
import {NavLink, useHistory} from 'react-router-dom'


const CreateProfile = ({user, setRhsUser}) => {
        // Create Profile State
        const [project, setProject] = useState()
        const [username, setUsername] = useState("")
        const [connection, setConnection] = useState("")
        const [submitted, setSubmitted] = useState(false)
        const [projects, setProjects] = useState(null)

        const history = useHistory()

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
        history.push("/user")

    }

    console.log(projects)

  return submitted ? (<div>
      <h2>Profile Created</h2>
      <NavLink to="/location">
            <div className="to-app">
            <h1>Consultation App</h1> <h1><FaAngleRight id="consultation" label="Consultation" style={{height: '2em', width: '2em'}}/></h1>
            </div>
        </NavLink>
  </div>) : (
    <div className="profile">
    <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
        <label>
            Username you are happy to have other users see next to your comments:
        </label>
            <input type="text" value={username} onChange={handleUsername}/>
        </div>
        
        <div className="form-group">
        <label>
            Choose a location (it should be relevant / local to you)
         </label>
        <select name="project" id="FormSelect" value={project} onChange={handleProject}>
            <option value="">Please choose an option</option>
            {projects && projects.map((project)=>(
                <option key={project.slug.current} value={project._id} >{project.name}</option>
            ))}
        </select>
        </div>
        
        <div className="form-group">
        <label>
           {project ? <div><p>Please tell us about your connection to this location</p> <textarea onChange={handleConnection}/></div>: null} 
        </label>
        </div>
        <button className="btn">
            <input type="submit" value="Submit"/>
        </button>
        </form>
</div>
  )
}

export default CreateProfile
  