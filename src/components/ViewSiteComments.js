import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import axios from 'axios';
import Pin from './Pin'
import PageHeader from './PageHeader';
import { useLocation } from 'react-router-dom'


const ViewSiteComments = (props) => {

    const [localLocation] = useState(() => {
        const saved = localStorage.getItem('location');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    })

    const getLat= () => {
        let lat
        try{
            lat = props.location.properties.lat.number
        }
        catch{
            lat = localLocation.properties.lat.number
        }
        return lat
    }
    const getLng= () => {
        let lng
        try{
            lng = props.location.properties.lng.number
        }
        catch{
            lng = localLocation.properties.lng.number
        }
        return lng
    }

    const [viewPort, setViewport] = useState({
        latitude: getLat(),
        longitude: getLng(),
        width: '100vw',
        height: '100vh',
        zoom: 17
    })

    const id = useLocation()
    // Format
    const formattedUrl = id.pathname.slice(10, -19)
    console.log(formattedUrl)

    // useEffect(() => {
    //     window.addEventListener("beforeunload", alertUser);
    //     return () => {
    //       window.removeEventListener("beforeunload", alertUser);
    //     };
    //   }, []);
    //   const alertUser = (e) => {
    //     e.preventDefault();
    //     e.returnValue = "";
    //   };

    const [ selectedSite, setSelectedSite ] = useState(null)
    const [comments, setComments] = useState([])

    const colour = (id) => {
        const col = '#'
        const hex = id.slice(-7, -1)
        const hexcol = col.concat(hex);
        return hexcol
    }

    const [pageInfo] = useState({
        title: `View Site Comments for ${formattedUrl}`,
        body: "Showing comments and where they relate to"
    })

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/${formattedUrl}`)
            console.log(result.data)
            setComments(result.data)            
        }
        fetchItems()
    }, [formattedUrl])

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
               {comments.map((comment) => (
                   <Marker
                    key={comment.id}
                    latitude={comment.properties.lat.number}
                    longitude={comment.properties.lng.number}
                   >
                       
                       <button className="marker-btn"
                       onClick={(e) => {
                           e.preventDefault();
                           setSelectedSite(comment)
                       }}
                       >
                       <Pin pin={{size: 60, stroke: 'none', fill: colour(comment.id)}}/>
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

export default ViewSiteComments
