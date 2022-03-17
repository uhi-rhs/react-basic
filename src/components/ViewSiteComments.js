import React, {useState, useEffect} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import Pin from './Pin'
import PageHeader from './PageHeader';
import sanityClient from "../writeClient"


const ViewSiteComments = (props) => {

    // const [localLocation] = useState(() => {
    //     const saved = localStorage.getItem('location');
    //     const initialValue = JSON.parse(saved);
    //     return initialValue || ""
    // })

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

      const [comments, setComments] = useState([])

      // Get Data
  
      useEffect(()=> {
          sanityClient
          .fetch(`*[_type == "siteComment" && project._ref == "${rhsUser.project._ref}"]{
              comment,
              published,
              project,
              lat, 
              lng,
              category,
              _id,
          }`)
          .then((data) => setComments(data))
          .catch(console.error)
      },[rhsUser.project._ref])

    const [pageInfo] = useState({
        title: `View Site Comments for ${rhsUser.projectName.name}`,
        body: "Showing comments and where they relate to"
    })

    // const getLat= () => {
    //     let lat
    //     try{
    //         lat = comments[0].lat
    //     }
    //     catch{
    //         lat = 0.000
    //     }
    //     return lat
    // }
    // const getLng= () => {
    //     let lng
    //     try{
    //         lng = comments[0].lng
    //     }
    //     catch{
    //         lng = 0.000
    //     }
    //     return lng
    // }

// Mapbox Setup
    const [viewPort, setViewport] = useState({
        
        latitude: 0.000,
        longitude: 0.000,
        width: '100vw',
        height: '100vh',
        zoom: 15
    })

    useEffect(()=> {
        const getLat= () => {
            let lat
            try{
                lat = comments[0].lat
            }
            catch{
                lat = 0.000
            }
            return lat
        }
        const getLng= () => {
            let lng
            try{
                lng = comments[0].lng
            }
            catch{
                lng = 0.000
            }
            return lng
        }
        setViewport({
            latitude: getLat(),
            longitude: getLng(),
            width: '100vw',
            height: '100vh',
            zoom: 15
        })
    },[comments])


    // const colour = (id) => {
    //     const col = '#'
    //     const hex = id.slice(-7, -1)
    //     const hexcol = col.concat(hex);
    //     return hexcol
    // }

    // const id = useLocation()
    // // Format
    // const formattedUrl = id.pathname.slice(10, -19)
    // console.log(formattedUrl)

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


    // UI
    const [ selectedSite, setSelectedSite ] = useState(null)
  
    console.log(selectedSite)

// const value = 57.14853732960749
// console.log(value.toString().slice(-7,-1))

  

    
    // useEffect(() => {
    //     const fetchItems = async () => {
    //         // const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/${formattedUrl}`)
    //         const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/site_comments`)
    //         console.log(result.data)
    //         setComments(result.data)            
    //     }
    //     fetchItems()
    // }, [formattedUrl])


    if(!comments) return <div>Loading...</div>
    return (
        <>
        {/* <PageHeader info={pageInfo}/> */}
        <PageHeader info={pageInfo}/>
        {/* <div className="location-container"> */}
      
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
                    key={comment._id}
                    latitude={comment.lat}
                    longitude={comment.lng}
                   >
                       
                       <button className="marker-btn"
                       onClick={(e) => {
                           e.preventDefault();
                           setSelectedSite(comment)
                       }}
                       >
                       <Pin pin={{size: 20, stroke: 'white', fill: `#${comment.lat.toString().slice(-7,-1)}`                       
                       }}/>
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
                    latitude={selectedSite.lat}
                    longitude={selectedSite.lng}
                    onClose={() => {
                        setSelectedSite(null);
                    }}
                   >
                       <div className="popup">
                           <h2>{selectedSite.comment}</h2>
                       </div>
                   </Popup>
               )}
           </ReactMapGL>
        {/* </div> */}
     
        </>
    )
}

export default ViewSiteComments
