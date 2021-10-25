import React, {useState, useCallback} from 'react'
import InteractiveMap, {Marker, Popup} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import Pin from './Pin'
import Comment from './Comment'
import Instructions from './Instructions'
import axios from 'axios'
import uuid from 'react-uuid'
import PageHeader from './PageHeader'

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


const ProposeSite = () => {


    const [viewport, setViewport] = useState({
        latitude: 57.13970027875067,
        longitude:  -4.180471747370376,
        width: '100vw',
        height: '100vh',
        zoom: 6,
        scrollZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
        // maxZoom: 1,
        // minZoom: 17
      });

    const [marker, setMarker] = useState({
        latitude: 57.0064,
        longitude: -3.3979,
        comment: '',
        visible: false
    })
    const [ popup, setPopup] = useState(null)

    const [ pin ] = useState({
        fill: 'yellow',
        stroke: 'none',
        size: 40
    })

    const [pageInfo] = useState({
        title: "Propose a Site",
        body: "This feature allows you to propose a site that you would like RHS to explore"
    })

    const [ instructions ] = useState({
        header: "How to Play",
        item1: "Click to drop a pin where you think the site should be",
        item2: "Add a comment to say why you think about this site",
        body: "Scroll, pinch or double click (tap) to zoom. Click (hold) and drag to reposition the view. "
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
        axios.post(`${process.env.REACT_APP_API_URL}/api/rhs/site_proposal_national/add`, submission)
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

export default ProposeSite
