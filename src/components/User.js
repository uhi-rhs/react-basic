import React, {useState, useEffect} from 'react'
// import Intro from './Intro'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import sanityClient from "../readClient"
import useLocalStorage from "../hooks/useLocalStorage";
import {FaAngleRight} from 'react-icons/fa'
import {NavLink} from 'react-router-dom'
import AppHeader from './AppHeader'
import CreateProfile from './CreateProfile'

const User = () => {

    const {user} = useAuth0()
    console.log(user)
    const { name, email} = user;

    // Form state logic
    const [displayForm] = useState(false)
    const [allowCreateProfile, setAllowCreateProfile] = useState(false)
    console.log(allowCreateProfile)
    console.log(displayForm)
      // RHS user
    const [rhsUser, setRhsUser] = useState(null)

    // Local storage of user
    const {setUser} = useLocalStorage("_id", "")

    useEffect(()=> {
        setUser(rhsUser)
    },[rhsUser, setUser])

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

    // const formDisplay = () => {
    //     return displayForm ? <CreateProfile user={user} setRhsUser={setRhsUser}/> : <div className="invisible"></div>
    // }

  console.log(rhsUser)

  return (
    <main className="">
           <AppHeader/>
           <div className="user-main">
                {
                    rhsUser ? 
                    
                    <section >
                        <div className="user-info">
                            <h2>Hi {rhsUser.username}</h2>
                            <p><span className="user-bold">Email: </span>{rhsUser.email}</p>
                            <p><span className="user-bold">Project you are associated with: </span>{rhsUser.projectName.name}</p>
                            <p><span className="user-bold">Connection to it: </span>{rhsUser.connection}</p>
                            <div>
                                forthcoming: information about the current state of the consultation etc
                            </div>
                            <NavLink to="/location">
                            <div className="to-app">
                                <h1>Consultation App</h1> <h1><FaAngleRight id="consultation" label="Consultation" style={{height: '2em', width: '2em'}}/></h1>
                            </div>
                            </NavLink>
                        </div>
                    </section>
                    :
            <section >
                <div className="user-info">
                    <p>This is the information we have from your login</p>
                    <div className="profile">
                    <p>Login username{name}</p>
                    <p>Login email{email}</p>
                    <br />
                    <NavLink to="/create-profile">
                    <p>Please create a profile so we can let you comment on the various features the app offers. </p>
                    </NavLink>
                    </div>
                    <CreateProfile user={user} setRhsUser={setRhsUser}/>
                </div>
                </section>
            
                }
        </div>
        <section>
        {/* {
            allowCreateProfile ? 
            <button onClick={(e) => setDisplayForm(!displayForm)}>
            {displayForm ? null: <p>Create Profile</p>}
            </button>
            :
            <div></div> 
        } */}
        {/* {formDisplay()} */}
        </section>

    </main>
        )
}

export default withAuthenticationRequired(User, {
    onRedirecting: () => <div>Loading...</div>
});