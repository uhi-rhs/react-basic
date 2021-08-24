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
import Story from './components/Story';
import LandingPage from './components/LandingPage';
import { useState, useEffect } from 'react'

function App() {

  const [ isLoading, setIsLoading ] = useState(true)
  const [ databases, setDatabases ] = useState([])
  // const [dbTitles, setDBTitles] = useState([])

  // const getTitles = (dblist) => {
  //   const titles = []
  //   dblist.results.map((db) => {
  //     titles.push(db.title[0].text.content)
  //   })
  //   return titles
  // }
  // const key = process.env.REACT_APP_API_URL
  // console.log(key)

  useEffect(() => {
    const fetchItems = async () => {
        const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/project_properties`)
        console.log(result.data)
        setDatabases(result.data)   
        setIsLoading(false)     
        // setDBTitles(getTitles(result.data))    
    }
    fetchItems()
    console.log('fetch')
}, [])


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
   <Route exact path="/form_view" component={FormView} />
   <Route exact path="/form_responses" component={FormResponses} />
   <Route exact path="/story_example" component={Story} />
   <Route exact path="/landing_page" component={LandingPage} />


   {/* <Route exact path="/site_layout"> 
    <SiteLayout isLoading={isLoading} setIsLoading={setIsLoading}/>
   </Route> */}
  
    <Route exact path="/">
      <Projects dbs={databases} isLoading={isLoading}/>
   </Route>
    </div>
  
    </Router>
  );
}

export default App;
