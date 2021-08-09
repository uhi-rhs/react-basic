import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import axios from 'axios';
import Pin from './Pin'

const ViewLocations = () => {

    const [viewPort, setViewport] = useState({
            latitude: 57.0064,
            longitude: -3.3979,
            width: '100vw',
            height: '100vh',
            zoom: 14
    })

    const [ selectedSite, setSelectedSite ] = useState(null)

    const [locations, setLocations] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`http://localhost:5000/api/locations`)
            console.log(result.data)
            setLocations(result.data)            
        }
        fetchItems()
        console.log('fetch')
    }, [])

    console.log(locations)
    console.log(viewPort)

    return (
        <div className="location-container">
           <ReactMapGL 
           {...viewPort} 
           mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
           onViewportChange={viewPort => {
               setViewport(viewPort);
           }}
           >
               {locations.map((location) => (
                   <Marker
                    key={location.id}
                    latitude={location.properties.lat.number}
                    longitude={location.properties.lng.number}
                   >
                       <button className="marker-btn"
                       onClick={(e) => {
                           e.preventDefault();
                           setSelectedSite(location)
                           console.log(selectedSite)
                       }}
                       >
                       <Pin />
                       </button>
                       
                   </Marker>
               ))}

               {selectedSite && (
                   <Popup
                    latitude={selectedSite.properties.lat.number}
                    longitude={selectedSite.properties.lng.number}
                    onClose={() => {
                        setSelectedSite(null);
                    }}
                   >
                       <div>
                           <h2>{selectedSite.properties.comment.rich_text[0].plain_text}</h2>
                       </div>
                   </Popup>
               )}
           </ReactMapGL>
        </div>
    )
}

export default ViewLocations
