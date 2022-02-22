import React, {useState, useCallback, useContext} from 'react'
import InteractiveMap, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import Pin from './Pin'
import Comment from './Comment'
import Instructions from './Instructions'
import axios from 'axios'
import uuid from 'react-uuid'
import PageHeader from './PageHeader'
import {serverContext} from '../App'
import { useLocation } from 'react-router-dom'

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const SiteComment = (props) => {

  
    // set viewport with latlng from project properties
    const [localLocation] = useState(() => {
        const saved = localStorage.getItem('location');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    })
    console.log(localLocation)
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

    const [viewport, setViewport] = useState({
        latitude: getLat(),
        longitude: getLng(),
        width: '100vw',
        height: '100vh',
        zoom: 15,
        scrollZoom: true,
        doubleClickZoom: false,
        touchZoom: true,
        maxZoom: 17,
        minZoom: 8
      });
    
    // create marker with default properties
    const [marker, setMarker] = useState({
        latitude: getLat(),
        longitude: getLng(),
        comment: '',
        visible: false
    })

    const server = useContext(serverContext)

    const [ popup, setPopup] = useState(null)

    const [ pin ] = useState({
        fill: 'yellow',
        stroke: 'none',
        size: 40
    })

    const id = useLocation()
    // Format
    const formattedUrl = id.pathname.slice(10, -13)

    const [pageInfo] = useState({
        title: `Comment on ${formattedUrl} proposal`,
        body: "This feature allows you to comment on a site that has already been agreed for RHS development"
    })

    const [ instructions ] = useState({
        header: "How to Play",
        item1: "Click to drop a pin to locate your comment. You can drag the pin around if you want to change your mind. ",
        item2: "Add a comment",
        body: "What is unique here, that you want to tell us about? Where do you think the housing should be?"
    })
    

    const handleClick = ({ lngLat: [longitude, latitude] }) => {
        if(!marker.visible){
            setMarker({...marker, latitude: latitude, longitude: longitude, visible: true}, console.log(marker))
            }
    }

    const saveSubmission = async (marker) => {
        const user_id = uuid()
        const submission = {
            lat: marker.latitude,
            lng: marker.longitude,
            comment: marker.comment,
            location: localLocation.properties.Name.title[0].plain_text,
            dateTime: "2021-10-01",
            publish: false,
            user_id: user_id
        }
        const headers = {
            'Content-Type': 'multipart/form-data'
        }
        // axios.post(`${server}/api/rhs/${formattedUrl}/site_comment/add`, submission)
        await axios.post(`${server}/api/rhs/site_comments/add`, submission,{headers})
        console.log("Submission:", submission)
    }

    const addComment = (marker) => {
        setMarker({...marker, marker})
        saveSubmission(marker)
        setPopup(true)
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

    const [showInstructions, setShowInstructions] = useState(true)

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

       <Comment marker={marker} onAdd={addComment} setShowInstructions={setShowInstructions}/>   : null} 
        {/* <NavigationControl 
            position={"bottom-left"}
        /> */}
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
