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
                       <Pin />
                   </Marker>
               ))}
           </ReactMapGL>
        </div>
    )
}

export default ViewLocations
