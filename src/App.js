import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Link } from 'react-router-dom';
import DraggableMarker from './components/DraggableMarker';
import DropMarker from './components/DropMarker';
import Intro from './components/Intro';
import MarkerComment from './components/MarkerComment';
import ViewLocations from'./components/ViewLocations';
import ViewPIComments from './components/ViewPIComments';
import Gallery from './components/Gallery'

function App() {
  return (
    <Router>
    <div className="App">   
    <Route exact path="/" component={Intro} />
    <Route exact path="/gallery" component={Gallery}/>
    <Route exact path="/view_pi_comments" component={ViewPIComments}/>
   <Route exact path="/drop_marker" component={DropMarker} />
   <Route exact path="/draggable_marker" component={DraggableMarker} />
   <Route exact path="/marker_comment" component={MarkerComment} />
   <Route exact path="/view_locations" component={ViewLocations} />
  
    <Route exact path="/">
   <Link to={"/drop_marker"}>
   <h2>Drop Marker</h2>                
    </Link>
    <Link to={"/view_locations"}>
   <h2>View Locations</h2>
   </Link>
    <Link to={"/draggable_marker"}>
   <h2>Draggable Marker</h2>
   </Link>
   <Link to={"/marker_comment"}>
   <h2>Marker Comment</h2>
   </Link> 
   <Link to={"/view_pi_comments"}>
   <h2>View PostIt Comments</h2>
   </Link> 
   <Link to={"/gallery"}>
   <h2>Gallery</h2>
   </Link> 
   </Route>
    </div>
  
    </Router>
  );
}

export default App;
