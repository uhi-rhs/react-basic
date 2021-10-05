import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import DraggableMarker from './components/DraggableMarker';
import DropMarker from './components/DropMarker';
import Intro from './components/Intro';
import MarkerComment from './components/MarkerComment';
import ViewLocations from'./components/ViewLocations';
import ViewPIComments from './components/ViewPIComments';
import Gallery from './components/Gallery';
import HouseStyles from './components/HouseStyles';
import MainHeader from './components/MainHeader';
import axios from 'axios';
import Projects from './components/Projects';
import FormView from './components/FormView'
import FormResponses from './components/FormResponses';
import Story from './components/story/Story';
import LandingPage from './components/LandingPage';
import Drawing from './components/Drawing';
import Location from './components/Location';
import SiteComment from './components/SiteComment'
import ViewComments from './components/ViewComments'
import ViewSiteComments from './components/ViewSiteComments'
import BasicComment from './components/BasicComment'
import { useState, useEffect } from 'react'

function App() {

  const [ isLoading, setIsLoading ] = useState(true)
  const [ databases, setDatabases ] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
        const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/project_properties`)
        console.log(result.data)
        setDatabases(result.data)   
        setIsLoading(false)     
    }
    fetchItems()
    console.log('fetch')
}, [])

// Location data (chosen project) to propogage through application
  const [location, setLocation] = useState({})
  // console.log('app.js', location)

  return (
    <Router>
    <div className="App">   
    {/* Home Title */}
    <Route exact path="/" component={Intro} />
    {/* Nav */}
    <Route exact path="/" component={MainHeader} />
    {/* Routes */}
    <Route exact path="/gallery" component={Gallery}/>
    <Route exact path="/view_pi_comments" component={ViewPIComments} />
   <Route exact path="/drop_marker" component={DropMarker} />
   <Route exact path="/draggable_marker" component={DraggableMarker} />
   <Route exact path="/marker_comment" component={MarkerComment} />
   <Route exact path="/view_locations" component={ViewLocations} />
   <Route exact path="/houses" component={HouseStyles} />
   {/* <Route exact path="/form_view" component={FormView} /> */}
   <Route exact path="/form_responses" component={FormResponses} />
   <Route exact path="/story_example" component={Story} />
   <Route exact path="/landing_page" component={LandingPage} />
   <Route exact path="/drawing" component={Drawing} />
   

   {/* <Route exact path="/location/:id" component={Location} /> */}
   <Route exact path="/location/:id" >
    <Location  location={location}/>
   </Route>
   <Route exact path="/location/:id/site_comment" >
    <SiteComment location={location} />
   </Route>
   <Route exact path="/location/:id/basic_comment" >
    <BasicComment location={location} />
   </Route>
   <Route exact path="/location/:id/story" >
    <Story location={location} />
   </Route>
   <Route exact path="/location/:id/view_basic_comments" >
    <ViewComments  location={location}/>
   </Route>
   <Route exact path="/location/:id/view_site_comments" >
    <ViewSiteComments  location={location}/>
   </Route>
   <Route exact path="/form_view" >
    <FormView  location={location}/>
   </Route>



   {/* <Route exact path="/site_layout"> 
    <SiteLayout isLoading={isLoading} setIsLoading={setIsLoading}/>
   </Route> */}
  
  {/* setLocation allows project data to be accessible from the parent component once a project has been selected by a user (that route hit from 'projects') But
  this won't currently work if a URL is sent to a user for a particular project */}
    <Route exact path="/">
      <Projects dbs={databases} isLoading={isLoading} setIsLoading={setIsLoading} setLocation={location => setLocation(location)}/>
   </Route>
    </div>
  
    </Router>
  );
}

export default App;
