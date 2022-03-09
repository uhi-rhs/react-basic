import './App.css';
import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import sanityClient from "./readClient"

import Auth0ProviderWithHistory from './auth/auth0-provider-with-history'


// import axios from 'axios';
// DEMO
import DraggableMarker from './components/demo/DraggableMarker';
import DropMarker from './components/DropMarker';
import Gallery from './components/demo/Gallery';
import DrawPolygon from './components/draw/DrawPolygon'
import DrawPolygonBasic from './components/draw/DrawPolygonBasic'

import Intro from './components/Intro';
import MarkerComment from './components/MarkerComment';
import ViewLocations from'./components/ViewLocations';
import HouseStyles from './components/demo/HouseStyles';
import MainHeader from './components/MainHeader';


import Projects from './components/Projects';
import FormView from './components/FormView'
import FormResponses from './components/FormResponses';
import Story from './components/story/Story';
// import LandingPage from './components/demo/LandingPage';
import Drawing from './components/Drawing';
import Location from './components/Location';
import SiteComment from './components/SiteComment'
import ViewComments from './components/ViewComments'
import ViewSiteComments from './components/ViewSiteComments'
import BasicComment from './components/BasicComment'
import ProposeSite from './components/ProposeSite'
import HouseTypes from './components/HouseTypes';
import ViewHouseTypeFeedback from './components/ViewHouseTypeFeedback';
import SurveyResponses from './components/SurveyResponses';
import Footer from './components/Footer'
import User from './components/User'
import LandingPage from './components/LandingPage'
import LogOut from './components/LogOut'

export const LocationContext = React.createContext()

// Dev Server:
// export const serverContext = React.createContext("http://localhost:5000")
// Production Server:
export const serverContext = React.createContext(process.env.REACT_APP_API_URL)


function App() {

  const [rhsUser] = useState(()=> {
    const saved = localStorage.getItem('_id');
    const initialValue = JSON.parse(saved);
    return initialValue || ""
  })

console.log(rhsUser)

  // Spinner if no data
  // const [ isLoading, setIsLoading ] = useState(true)
  // databases: all the projects that will display as links 
  // const [ databases, setDatabases ] = useState([])

  // Location data (chosen project) to propogate through application
  // const [location, setLocation] = useState({})

//   const [localLocation, setLocalLocation] = useState(() => {
//     const saved = localStorage.getItem('location');
//     const initialValue = JSON.parse(saved);
//     return initialValue || ""
// })

  // console.log("APP.js", location)

  // const server = useContext(serverContext)

//   useEffect(() => {
//     const fetchItems = async () => {
//         const result = await axios(`${server}/api/rhs/project_properties`)
//         if (!result) {
//           throw new Error(`HTTP error! status: ${result.status}`);
//         }
//         setDatabases(result.data)   
//         setIsLoading(false)     
//     }
//     fetchItems()
//     .catch(e => {
//       console.log("There has been an error in the fetch within useEffect" + e.message)
//     })
// }, [server])

  const [projects, setProjects] = useState(null)

  useEffect(()=> {
    sanityClient
    .fetch(`*[_type == "project"]{
      name,
      slug,
      _id,
      location->{
        name,
        description
      }
    }`)
    .then((data) => setProjects(data))
    .catch(console.error)
  },[])

  console.log(projects)
  return (
    <Router>
      <Auth0ProviderWithHistory>
    <div className="App">   
    {/* Homepage */}
      <Route exact path="/" component={Intro} />
      <Route exact path="/">
        <Projects projects={projects} />
        <Footer />
      </Route>

      {/* RHS Panel */}
        <Route exact path="/rhs_panel" component={MainHeader} />

          {/* Demo Components */}
        <Route exact path="/gallery" component={Gallery}/>
        <Route exact path="/drop_marker" component={DropMarker} />
        <Route exact path="/draggable_marker" component={DraggableMarker} />
        <Route exact path="/marker_comment" component={MarkerComment} />
        <Route exact path="/view_locations" component={ViewLocations} />
        <Route exact path="/houses" component={HouseStyles} />
        <Route exact path="/form_view" component={FormView} />
        <Route exact path="/form_responses" component={FormResponses} />
        <Route exact path="/story_example" component={Story} />
        <Route exact path="/landing-page" component={LandingPage} />
        <Route exact path="/drawing" component={Drawing} />
        <Route exact path="/site_proposal_national" component={ProposeSite} />
        <Route exact path="/draw_polygon" component={DrawPolygon} />
        <Route exact path="/draw_polygon_basic" component={DrawPolygonBasic} />
   
        <Route exact path="/user" component={User} />
        <Route exact path="/logout" component={LogOut} />
    {/* Routes for chosen project / location */}
    {/* TO DO  - remove props (usecontext is doing this work) */}
    {/* <LocationContext.Provider value={location} > */}

      <Route exact path="/location" >
        <Location />
      </Route>
      <Route exact path="/location/site_comment" >
        <SiteComment/>
      </Route>
      <Route exact path="/location/basic_comment" >
        <BasicComment user={rhsUser}/>
      </Route>
      <Route exact path="/location/story" >
        <Story user={rhsUser}/>
      </Route>
      <Route exact path="/location/view_basic_comments" >
        <ViewComments user={rhsUser}/>
      </Route>
      <Route exact path="/location/view_site_comments" >
        <ViewSiteComments />
      </Route>
      <Route exact path="/location/form_view" >
        <FormView />
      </Route>
      <Route exact path="/location/survey_responses" >
        <SurveyResponses />
      </Route>

      <Route exact path="/location/house_types" >
        <HouseTypes />
      </Route>
      <Route exact path="/location/house_votes" >
        <ViewHouseTypeFeedback />
      </Route>
    {/* </LocationContext.Provider> */}

    </div>
    </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
