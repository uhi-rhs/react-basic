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

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


const SiteComment = (props) => {
    // set viewport with latlng from project properties
    const [viewport, setViewport] = useState({
        latitude: props.location.properties.lat.number,
        longitude: props.location.properties.lng.number,
        width: '100vw',
        height: '100vh',
        zoom: 17,
        scrollZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        maxZoom: 17,
        minZoom: 17
      });
    
    // create marker with default properties
    const [marker, setMarker] = useState({
        latitude: props.location.properties.lat.number,
        longitude: props.location.properties.lng.number,
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

    const [pageInfo] = useState({
        title: `Comment on ${props.location.properties.Name.title[0].plain_text} proposal`,
        body: "This feature allows you to comment on a site that has already been agreed for RHS development"
    })


    const [ instructions ] = useState({
        header: "How to Play",
        item1: "Click to drop a pin where you think the site should be",
        item2: "Add a comment to say why you think about this site",
        body: "Remember: where are the views? How can you use the sun to help energy savings? How can you create shelter from things like wind and rain?"
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
            dateTime: "2021-10-01",
            publish: false,
            user_id: user_id
        }
        axios.post(`${server}/api/rhs/${props.location.properties.Name.title[0].plain_text}/site_comment/add`, submission)
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


    console.log(props)
    return (
        // <div>
        //     Hi
        //     <p>
        //     {props.location.id}</p>
        //     <p>{props.location.properties.lat.number}</p>
        //     <p>{props.location.properties.lng.number}</p>
        // </div>
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
            {/* <PageHeader info={pageInfo}/> */}
           <Instructions instructions={instructions}/>
      {marker.visible ? 

       <Comment marker={marker} onAdd={addComment}/>   : null} 
        
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
