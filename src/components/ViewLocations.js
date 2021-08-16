import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import axios from 'axios';
import Pin from './Pin'
import PageHeader from './PageHeader';
import Spinner from './Spinner'


const ViewLocations = () => {

    const [viewPort, setViewport] = useState({
            latitude: 57.0064,
            longitude: -3.3979,
            width: '100vw',
            height: '100vh',
            zoom: 17
    })
    const [ selectedSite, setSelectedSite ] = useState(null)
    const [locations, setLocations] = useState([])
    // const [ pin ] = useState(null)

    const colour = (id) => {
        const col = '#'
        const hex = id.slice(-7, -1)
        const hexcol = col.concat(hex);
        return hexcol
    }

    const [pageInfo] = useState({
        title: "View Locations",
        body: "Showing proposed sites with comments"
    })

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs`)
            console.log(result.data)
            setLocations(result.data)            
        }
        fetchItems()
        console.log('fetch')
    }, [])

    // console.log(locations)
    // console.log(viewPort)

    return (
        <>
        <PageHeader info={pageInfo}/>
        <div className="location-container">
           <ReactMapGL 
           {...viewPort} 
           mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
           mapStyle="mapbox://styles/mapbox/satellite-v9"
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
                       <Pin pin={{size: 60, stroke: 'none', fill: colour(location.id)}}/>
                       </button>
                       
                   </Marker>
               ))}

               {selectedSite && (
                   <Popup
                    tipSize={10}
                    anchor="bottom-left"
                    dynamicPosition={true}
                    offsetLeft={55}
                    offsetTop={0}
                    latitude={selectedSite.properties.lat.number}
                    longitude={selectedSite.properties.lng.number}
                    onClose={() => {
                        setSelectedSite(null);
                    }}
                   >
                       <div className="popup">
                           <h2>{selectedSite.properties.comment.rich_text[0].plain_text}</h2>
                       </div>
                   </Popup>
               )}
           </ReactMapGL>
        </div>
        </>
    )
}

export default ViewLocations
