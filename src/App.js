import './App.css';
import React, { useState, useEffect, useContext } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios';
// DEMO
import DraggableMarker from './components/demo/DraggableMarker';
import DropMarker from './components/DropMarker';
import Gallery from './components/demo/Gallery';

import Intro from './components/Intro';
import MarkerComment from './components/MarkerComment';
import ViewLocations from'./components/ViewLocations';
import ViewPIComments from './components/ViewPIComments';
import HouseStyles from './components/demo/HouseStyles';
import MainHeader from './components/MainHeader';

import Projects from './components/Projects';
import FormView from './components/FormView'
import FormResponses from './components/FormResponses';
import Story from './components/story/Story';
import LandingPage from './components/demo/LandingPage';
import Drawing from './components/Drawing';
import Location from './components/Location';
import SiteComment from './components/SiteComment'
import ViewComments from './components/ViewComments'
import ViewSiteComments from './components/ViewSiteComments'
import BasicComment from './components/BasicComment'
import ProposeSite from './components/ProposeSite'
import BuildingMaterials from './components/BuildingMaterials'
import HouseTypes from './components/HouseTypes';


export const LocationContext = React.createContext()
// export const serverContext = React.createContext("http://localhost:5000")
export const serverContext = React.createContext(process.env.REACT_APP_API_URL)


function App() {

  // Spinner if no data
  const [ isLoading, setIsLoading ] = useState(true)
  // databases: all the projects that will display as links 
  const [ databases, setDatabases ] = useState([])

  // Location data (chosen project) to propogate through application
  const [location, setLocation] = useState({})

  const server = useContext(serverContext)

  useEffect(() => {
    const fetchItems = async () => {
        const result = await axios(`${server}/api/rhs/project_properties`)
        setDatabases(result.data)   
        setIsLoading(false)     
    }
    fetchItems()
}, [server])



  return (
    <Router>
    <div className="App">   
    {/* Homepage */}
      <Route exact path="/" component={Intro} />
      <Route exact path="/" component={MainHeader} />
      <Route exact path="/">
        <Projects dbs={databases} isLoading={isLoading} setIsLoading={setIsLoading} setLocation={location => setLocation(location)}/>
      </Route>

          {/* Demo Components */}
        <Route exact path="/gallery" component={Gallery}/>
        <Route exact path="/view_pi_comments" component={ViewPIComments} />
        <Route exact path="/drop_marker" component={DropMarker} />
        <Route exact path="/draggable_marker" component={DraggableMarker} />
        <Route exact path="/marker_comment" component={MarkerComment} />
        <Route exact path="/view_locations" component={ViewLocations} />
        <Route exact path="/houses" component={HouseStyles} />
        <Route exact path="/form_view" component={FormView} />
        <Route exact path="/form_responses" component={FormResponses} />
        <Route exact path="/story_example" component={Story} />
        <Route exact path="/landing_page" component={LandingPage} />
        <Route exact path="/drawing" component={Drawing} />
        <Route exact path="/site_proposal_national" component={ProposeSite} />
   

    {/* Routes for chosen project / location */}
    <LocationContext.Provider value={location}>
      <Route exact path="/location/:id" >
        <Location  location={location} isLoading={isLoading}/>
      </Route>
      <Route exact path="/location/:id/site_comment" >
        <SiteComment location={location} isLoading={isLoading}/>
      </Route>
      <Route exact path="/location/:id/basic_comments" >
        <BasicComment location={location} isLoading={isLoading}/>
      </Route>
      <Route exact path="/location/:id/story" >
        <Story location={location} isLoading={isLoading}/>
      </Route>
      <Route exact path="/location/:id/view_basic_comments" >
        <ViewComments  location={location} isLoading={isLoading}/>
      </Route>
      <Route exact path="/location/:id/view_site_comments" >
        <ViewSiteComments  location={location} isLoading={isLoading}/>
      </Route>
      <Route exact path="/location/:id/form_view" >
        <FormView  location={location} isLoading={isLoading} />
      </Route>
      <Route exact path="/location/:id/form_responses" >
        <FormResponses location={location} isLoading={isLoading} />
      </Route>
      <Route exact path="/location/:id/building_materials" >
        <BuildingMaterials location={location} isLoading={isLoading} />
      </Route>
      <Route exact path="/location/:id/house_types" >
        <HouseTypes location={location} isLoading={isLoading} />
      </Route>
    </LocationContext.Provider>

    </div>
  
    </Router>
  );
}

export default App;
