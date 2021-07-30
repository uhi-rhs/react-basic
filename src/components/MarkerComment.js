import React, {useState, useCallback} from 'react'
import InteractiveMap, {Marker} from 'react-map-gl'
import Pin from './Pin'
import Comment from './Comment'

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


    const handleClick = ({ lngLat: [longitude, latitude] }) => {
        if(!marker.visible){
            setMarker({...marker, latitude: latitude, longitude: longitude, visible: true}, console.log(marker))
            }
    }

  
    const addComment = (marker) => {
        // console.log(comment)
        setMarker({...marker, marker})
    }


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

       <Comment marker={marker} onAdd={addComment}/>
      
      : null} 
      
      
      <Marker 
      longitude={marker.longitude}
      latitude={marker.latitude}
      draggable={true}
      >
      {marker.visible ? <Pin /> : null}  
                           
      </Marker>

      <h1>{marker.comment}</h1>
        </InteractiveMap>
    )
}
