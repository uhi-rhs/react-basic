import React, {useState, useCallback, useEffect} from 'react'
import InteractiveMap, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import Pin from './Pin'
import Comment from './Comment'
import Instructions from './Instructions'
import PageHeader from './PageHeader'
import sanityClient from "../readClient"

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const SiteComment = () => {

    // get user info from local storage
    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

    //   Project data
    const [project, setProject] = useState({
        client: "",
        description: [],
        lat: 0.000,
        lng: 0.000,
        location: {
            name: "",
        },
        name: "",
    })
    
    useEffect(()=> {
        sanityClient
        .fetch(`*[_type == "project" && _id == "${rhsUser.project._ref}"]{
            name,
            _ref,
            location->{
                name
            },
            lat,
            lng,
            phase1,
            phase2,
            description,
            slug,
            client
        }`)
        .then((data)=> setProject(data[0]))
        .catch(console.error)
    },[rhsUser.project._ref])


    // Mapbox state
    const [viewport, setViewport] = useState({});
    const [marker, setMarker] = useState({})
    const [ popup, setPopup] = useState(null)
    const [ pin ] = useState({
        fill: 'yellow',
        stroke: 'none',
        size: 40
    })

    // update mapbox data on project data loading
    useEffect(()=> {
        setViewport({
            latitude: project.lat,
            longitude: project.lng,
            width: '100vw',
            height: '100vh',
            zoom: 15,
            scrollZoom: true,
            doubleClickZoom: false,
            touchZoom: true,
            maxZoom: 17,
            minZoom: 8
          })
        setMarker({
            latitude: project.lat,
            longitude: project.lng,
            comment: '',
            visible: false
        })
    },[project])


    // UI state
    const [pageInfo] = useState({
        title: `Comment on ${project.name} proposal`,
        body: "This feature allows you to comment on a site that has already been agreed for RHS development"
    })

    const [ instructions ] = useState({
        header: "How to Play",
        item1: "Click to drop a pin to locate your comment. You can drag the pin around if you want to change your mind. ",
        item2: "Add a comment",
        body: "What is unique here, that you want to tell us about? Where do you think the housing should be?"
    })
    const [showInstructions, setShowInstructions] = useState(true)


    // Map interaction functions
    const handleClick = ({ lngLat: [longitude, latitude] }) => {
        if(!marker.visible){
            setMarker({...marker, latitude: latitude, longitude: longitude, visible: true}, console.log(marker))
            }
    }

    const onMarkerDragEnd = useCallback(e => {
        setMarker(prevMarker => ({
            ...prevMarker,
            comment: prevMarker.comment,
            longitude: e.lngLat[0],
            latitude: e.lngLat[1],
            visible: true
        })               
        )
    },[])

    // comment submit functions
    // const saveSubmission = async (marker) => {
    //     const submission = {
    //         lat: marker.latitude,
    //         lng: marker.longitude,
    //         comment: marker.comment,
    //         location: project.location,
    //         dateTime: new Date().toISOString(),
    //         publish: false,
    //         author: {
    //             _type: 'reference',
    //             _ref: rhsUser._id
    //         },
    //         project: {
    //             _type: 'reference',
    //             _ref: rhsUser.project._ref
    //         }
    //     }
    //     const headers = {
    //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //         withCredentials: false,
    //     }
    //     axios.post(`${server}/api/rhs/${formattedUrl}/site_comment/add`, submission)
    //     await axios.post(`${server}/api/rhs/site_comments/add`, submission,{headers})
    //     console.log("Submission:", submission)
    // }

    // const addComment = (marker) => {
    //     setMarker({...marker, marker})
    //     saveSubmission(marker)
    //     setPopup(true)
    // }



    return (
        <>
         <PageHeader info={pageInfo}/>
        <InteractiveMap
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onViewportChange={viewport => {
            setViewport(viewport);
          }}
          onClick={handleClick}
        >
           {showInstructions ? 
            <Instructions instructions={instructions}/>
            : null
           }
           
      {marker.visible ? 

       <Comment marker={marker} setPopup={setPopup} project={project} rhsUser={rhsUser} setMarker={setMarker} setShowInstructions={setShowInstructions}/>   : null} 
   
      <Marker 
      
      longitude={marker.longitude}
      latitude={marker.latitude}
      draggable={true}
      onDragEnd={onMarkerDragEnd}>
      
      {marker.visible ? <Pin pin={pin}/> : null}  
   
      </Marker>

        {popup && (
            <Popup
            tipSize={5}
            anchor="bottom-left"
            dynamicPosition={true}
            longitude={marker.longitude}
            latitude={marker.latitude}
            closeOnClick={false}
            onClose={setPopup}
            offsetLeft={15}
            offsetTop={0}>

            <h4>{marker.comment}</h4>
            </Popup>  
        )}            
        </InteractiveMap>
        </>
    )
}

export default SiteComment
