import React, {useState, useCallback} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl'
import Pin from '../Pin'

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

    const [ pin ] = useState({
      size: 60,
      stroke: 'none',
      fill: 'yellow'
    })

    const onMarkerDragEnd = useCallback(event => {
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
            <Pin pin={pin} />
            </Marker>

        </ReactMapGL>
        </div>
    )
}
