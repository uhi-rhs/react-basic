import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import axios from 'axios';
import Pin from './Pin'
import PageHeader from './PageHeader';

const ViewSiteComments = (props) => {

    const [viewPort, setViewport] = useState({
        latitude: props.location.properties.lat.number,
        longitude: props.location.properties.lng.number,
        width: '100vw',
        height: '100vh',
        zoom: 17
})

const [ selectedSite, setSelectedSite ] = useState(null)
    const [comments, setComments] = useState([])
    // const [ pin ] = useState(null)

    const colour = (id) => {
        const col = '#'
        const hex = id.slice(-7, -1)
        const hexcol = col.concat(hex);
        return hexcol
    }

    

    const [pageInfo] = useState({
        title: `View Site Comments for ${props.location.properties.Name.title[0].plain_text}`,
        body: "Showing comments and where they relate to"
    })

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/${props.location.properties.Name.title[0].plain_text}`)
            console.log(result.data)
            setComments(result.data)            
        }
        fetchItems()
        console.log('fetch')
    }, [])

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
                           console.log(selectedSite)
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
