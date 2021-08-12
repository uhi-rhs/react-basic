import React, {useState} from 'react'

import InteractiveMap, {Marker} from 'react-map-gl'
import PageHeader from './PageHeader';

export default function DropMarker() {

    const [viewport, setViewport] = useState({
        latitude: 57.0064,
        longitude: -3.3979,
        width: '100vw',
        height: '100vh',
        zoom: 15
      });

    const [markers, setMarkers] = useState([])

    const [pageInfo] = useState({
        title: "Prototype Drop Marker",
        body: "Uses house icon instead of pin"
    })

    const handleClick = ({ lngLat: [longitude, latitude] }) => 
    setMarkers(markers => [...markers, { longitude, latitude }]);

    return (
        <>
        <PageHeader info={pageInfo}/>
        <InteractiveMap
        onClick={handleClick}
      
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
            {markers.length ? markers.map((m, i) => (
                <Marker 
                {...m} key={i} 
                className="marker"
                draggable={true}
                offsetTop={-20}
                offsetLeft={-10}
                >
                    {/* <Pin size={30} /> */}
                    <img src="house-icon.jpeg" alt="house icon" id='icon'/>
                </Marker>
            )) : null}
        </InteractiveMap>
        </>
    )
}
