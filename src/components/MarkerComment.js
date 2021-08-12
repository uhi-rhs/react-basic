import React, {useState, useCallback} from 'react'
import InteractiveMap, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import Pin from './Pin'
import Comment from './Comment'
import Instructions from './Instructions'
import axios from 'axios'
import uuid from 'react-uuid'

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function MarkerComment() {

    const [viewport, setViewport] = useState({
        latitude: 57.0064,
        longitude: -3.3979,
        width: '100vw',
        height: '100vh',
        zoom: 15
      });

    const [marker, setMarker] = useState({
        latitude: 57.0064,
        longitude: -3.3979,
        comment: '',
        visible: false
    })
    const [ popup, setPopup] = useState(null)

    const [ instructions ] = useState({
        header: "How to Play",
        item1: "Click to drop a pin where you think the site should be",
        item2: "Add a comment to say why you think this is a good site",
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
            publish: false,
            user_id: user_id
        }
        axios.post('http://localhost:5000/api/rhs/add', submission)
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

    return (
        <InteractiveMap
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
            setViewport(viewport);
          }}
          onClick={handleClick}
        >
           <Instructions instructions={instructions}/>
      {marker.visible ? 

       <Comment marker={marker} onAdd={addComment}/>   : null} 
        
      <Marker 
      longitude={marker.longitude}
      latitude={marker.latitude}
      draggable={true}
      onDragEnd={onMarkerDragEnd}>
      
      {marker.visible ? <Pin /> : null}  
   
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
    )
}