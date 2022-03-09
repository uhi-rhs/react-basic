import React, {useState, useEffect} from 'react'
import Intro from './Intro'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import sanityClient from "../readClient"
import CreateProfile from './CreateProfile'
import {NavLink} from 'react-router-dom'
import useLocalStorage from "../hooks/useLocalStorage";

const User = () => {

    // Auth0 user data
    // const { isAuthenticated } = useAuth0()
    const {user} = useAuth0()
    console.log(user)
    const { name, email} = user;

    // Form state logic
    const [displayForm, setDisplayForm] = useState(false)
    const [allowCreateProfile, setAllowCreateProfile] = useState(false)


      // RHS user
    const [rhsUser, setRhsUser] = useState(null)

    // Local storage of user
    const {setUser} = useLocalStorage("_id", "")

    useEffect(()=> {
        setUser(rhsUser)
    },[rhsUser, setUser])
    // // Create Profile State
    // const [location, setLocation] = useState()
    // const username = useRef(null)
    // const connection = useRef(null)
    // const [submission, setSubmission] = useState(null)

  
    

    // Project info - replace with useContext
    // const [projects, setProjects] = useState(null)

    // // Query for project info
    // useEffect(()=> {
    //   sanityClient
    //   .fetch(`*[_type == "project"]{
    //     name,
    //     slug,
    //     location->{
    //       name,
    //       description
    //     }
    //   }`)
    //   .then((data) => setProjects(data))
    //   .catch(console.error)
    // },[])

    // Query to check if profile already exists
    useEffect(() => {
        sanityClient
        .fetch(`*[_type == "user" && email == "${user.email}"]{
            username,
            _id,
            email,
            project,
            "projectName":project->{
                name
            },
            connection,
        }`)
        .then((data) => setRhsUser(data[0]))
        .catch(console.error)
    },[user.email])

    console.log(rhsUser)

    useEffect(()=> {
        if(!rhsUser){
            setAllowCreateProfile(true)
        }else{
            setAllowCreateProfile(false)
        }
    },[rhsUser])

    const formDisplay = () => {
        return displayForm ? <CreateProfile user={user} setRhsUser={setRhsUser}/> : <div className="invisible"></div>
    }
    // // Form Functions

    // const handleChange = (e) => {
    //     setLocation(e.target.value)
    // }

    // const handleSubmit = (e) => {
    //     setSubmission({

    //     })
    // }
  

  return (
    <React.Fragment>
           <Intro />
        <div>Hi User</div>

        {
            rhsUser ? 
            
            <section>
                <div>
                    <h2>{rhsUser.username}</h2>
                    <p>{rhsUser.email}</p>
                    <p>{rhsUser.connection}</p>
                    <div>
                        forthcoming: list of comments, date from interactions, summary etc
                    </div>
                    <div><NavLink to="/location">To app///</NavLink></div>
                </div>
            </section>
            :
       <section>
        <p>This is the information we have from your login</p>
        <div className="profile">
        <p>Login username{name}</p>
        <p>Login email{email}</p>
        <br />
        <p>Please create a profile so we can let you comment on the various features the app offers. See our privacy policy here///</p>
        </div>
        </section>
       
        }

        <section>
        {
            allowCreateProfile ? 
            <button onClick={(e) => setDisplayForm(!displayForm)}>
            {displayForm ? null: <p>Create Profile</p>}
            </button>
            :
            <div></div> 
        }
        {formDisplay()}
        </section>

    </React.Fragment>
        )
}

export default withAuthenticationRequired(User, {
    onRedirecting: () => <div>Loading...</div>
});