import React, {useState, useEffect, useRef} from 'react'
import Intro from './Intro'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import sanityClient from "../readClient"

const User = () => {

    // Auth0 user data
    const { isAuthenticated } = useAuth0()
    const {user} = useAuth0()
    const { name, email} = user;

    // Create Profile State
    const [location, setLocation] = useState("")
    const username = useRef(null)
    const connection = useRef(null)
    const [submission, setSubmission] = useState(null)

    // RHS user
    const [rhsUser, setRhsUser] = useState(null)

    // Project info - replace with useContext
    const [projects, setProjects] = useState(null)

    // Query for project info
    useEffect(()=> {
      sanityClient
      .fetch(`*[_type == "project"]{
        name,
        slug,
        location->{
          name,
          description
        }
      }`)
      .then((data) => setProjects(data))
      .catch(console.error)
    },[])

    // Query to check if profile already exists
    useEffect(() => {
        sanityClient
        .fetch(`*[_type == "user" && email == "${user.email}"]{
            username,
            _id,
            email,
            location,
            connection,
        }`)
        .then((data) => setRhsUser(data[0]))
        .catch(console.error)
    },[user.email])

    // Form Functions

    const handleChange = (e) => {
        setLocation(e.target.value)
    }

    const handleSubmit = (e) => {
        setSubmission({

        })
    }
  

  return (
    <React.Fragment>
           <Intro />
        <div>Hi User</div>
        <p>This is the information we have from your login</p>
        <div className="profile">
        <p>Login username{name}</p>
        <p>Login email{email}</p>
        <br />
        <p>Please create a profile so we can let you comment on the various features the app offers. See uour privacy policy here///</p>
        </div>
        <div className="profile">
            <form onSubmit={handleSubmit}>
                <label>
                    Username you are happy to have other users see next to your comments:
                    <input type="text" ref={username} />

                </label>

                <label>
                    Choose a location (it should be relevant / local to you)
                <select name="" id="" value={location} onChange={handleChange}>
                    {projects && projects.map((project)=>(
                        <option value={projects.name} key={project.slug.current}>{project.name}</option>
                    ))}
                    </select>
                </label>
                <label htmlFor="">
                   {location ? <div><p>Please tell us about your connection to {location}</p> <textarea ref={connection}/></div>: null} 
                </label>
                <button>
                    <input type="submit" value="Submit"/>
                </button>
                </form>
        </div>
    </React.Fragment>
        )
}

export default withAuthenticationRequired(User, {
    onRedirecting: () => <div>Loading...</div>
});