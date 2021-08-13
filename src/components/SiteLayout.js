import React, {useState, useEffect, useCallback} from 'react'
import ReactMapGL, {Marker} from 'react-map-gl'
import axios from 'axios';
import PageHeader from './PageHeader';
import Spinner from './Spinner'
import SiteHouseRect from './SiteHouseRect';

const SiteLayout = ({isLoading, setIsLoading}) => {

    const [viewPort, setViewport] = useState({
        latitude: 57,
        longitude: -3,    
        width: '100vw',
        height: '100vh',
        zoom: 17
    })
    const [pageInfo] = useState({
        title: "View Site Layout",
        body: "Showing a site with feature allowing user to propose housing layout"
    })
    const [projectProperties, setProjectProperties] = useState()
    const [houses, setHouses] = useState([])
    const [newPositions, setNewPositions] = useState([])
    const [ selectedHouse, setSelectedHouse ] = useState({
        id: null,
    })


    const setNumberOfHouses = (number) => {
        const houseArray = []
        for (let i = 0; i < number; i++) {
            houseArray[i] = {
                id: i,
                latitude: (57.0056 + i/3500),
                longitude: -3.4020,
                rotation: null,
                draggable: false,
                colour: 'yellow'
            }
        }
        setHouses(houseArray)
    }

    const onMarkerDragEnd = useCallback((event) => {
        // Error is here
        let draggedArr = [...houses]
        console.log(selectedHouse)
        draggedArr[selectedHouse] = {
            ...houses[selectedHouse],
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        }
        setHouses(draggedArr)
        console.log(draggedArr)
        // code for updating one object (not array)
        // setHouses({
        //     longitude: event.lngLat[0],
        //     latitude: event.lngLat[1]
        // });
    },[]);



    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`http://localhost:5000/api/rhs/project_properties`)
            setProjectProperties(result.data)
            setNumberOfHouses(8)  
            setViewport(prevViewPort => ({
                ...prevViewPort,
                latitude: result.data[0].properties.lat.number,
                longitude: result.data[0].properties.lng.number,
                zoom: prevViewPort.zoom,
                width: prevViewPort.width,
                height: prevViewPort.height
            })               
            )
            setIsLoading(false)           
        }
        fetchItems()
    }, [])

    return isLoading? (<Spinner />) :
    (
        <div className="location-container">
        <PageHeader info={pageInfo}/>
        <h2>{console.log(selectedHouse)}</h2>

        <ReactMapGL 
        {...viewPort} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        maxZoom={17}
        minZoom={17}
        dragPan={false}
        onViewportChange={viewPort => {
            setViewport(viewPort);
        }}
        >
            
            {houses.map((house) => ( 
                <Marker
                 key={house.id}
                 latitude={house.latitude}
                 longitude={house.longitude}
                 draggable={house.draggable}
                 onDragEnd={onMarkerDragEnd}
                >  
                    <button className="marker-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log(house.id)
                        setSelectedHouse(houses[house.id])
                        // console.log('this',houses[house.id])
                        let newArr = [...houses]
                        newArr[house.id] = {
                            ...houses[house.id],
                            draggable: true,
                            colour: 'green'
                        }
                        setHouses(newArr)
                        console.log(newArr)
                    }}
                    >
                    <SiteHouseRect col={house.colour} scale={viewPort.zoom}   onDragEnd={(e) => {
                        console.log(e)
                    }}/>
                    </button>  
                </Marker>
            ))}    
            )
        </ReactMapGL>
</div>
    )
}

export default SiteLayout
