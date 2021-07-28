import React, {useState, useCallback} from 'react'
import InteractiveMap, {Marker} from 'react-map-gl'
import Pin from './Pin'
import Comment from './Comment'
import { waitForDomChange } from '@testing-library/dom';

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

    function handleClick({ lngLat: [longitude, latitude] }){
        if(!marker.visible){
        setMarker({...marker, latitude: latitude, longitude: longitude, visible: true}, console.log(marker))
        }
    }

    const formSubmit = (event) => {
        console.log(event)
        setMarker({...marker, comment: 'test'})
        console.log(marker.comment)
    }

    // function formSubmit(e){
    //     console.log(e)
    // }
    
    console.log(marker.visible)

    return (
        <InteractiveMap
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
            setViewport(viewport);
          }}
          onClick={handleClick}
        >
      {marker.visible ? 

       <Comment />
      
      : null} 
      
      
      <Marker 
      longitude={marker.longitude}
      latitude={marker.latitude}
      draggable={true}
      >
      {marker.visible ? <Pin /> : null}  
                           
      </Marker>
        </InteractiveMap>
    )
}
