import React, {useState, useCallback} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl'

import Pin from './Pin'


export default function DraggableMarker() {

    const [viewport, setViewport] = useState({
        latitude: 57.0064,
        longitude: -3.3979,
        width: '100vw',
        height: '100vh',
        zoom: 15
      });

    const [marker, setMarker] = useState({
        latitude: 57.0064,
        longitude: -3.3979
      });

    // const [ events, logEvents] = useState({});

    // const onMarkerDragStart = useCallback(event => {
    //     console.log('drag start')
    //     logEvents(_events => ({ ..._events, onDragStart: event.lngLat}));
    // },[]);

    // const onMarkerDrag = useCallback(event => {
    //     logEvents(_events => ({..._events, onDrag: event.lngLat}));
    // },[]);

    const onMarkerDragEnd = useCallback(event => {
        // logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
    },[]);


    return (
        <div className="App">
        <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapstyle='mapbox://styles/dvlprnd/ckr6eajf21wdv19p328agg3l4'
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        >

            <Marker 
            longitude={marker.longitude}
            latitude={marker.latitude}
            offsetTop={0}
            offsetLeft={0}
            draggable={true}
           
            onDragEnd={onMarkerDragEnd}
            className="marker"
            >
            <Pin size={30} />
            </Marker>

        </ReactMapGL>
        </div>
    )
}
