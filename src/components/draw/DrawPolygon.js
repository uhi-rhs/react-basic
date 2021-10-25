import React, {useState, useRef, useCallback} from 'react'
import mapboxgl from 'mapbox-gl'
import InteractiveMap from 'react-map-gl'
import { Editor, DrawPolygonMode, EditingMode } from 'react-map-gl-draw'
import {getFeatureStyle, getEditHandleStyle} from './style'
import PageHeader from '../PageHeader';

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const DrawPolygon = () => {

    // Mapbox viewport settings
    const [viewport, setViewport] = useState({
        longitude: -7.2986658,
        latitude: 57.0860345,
        width: '100vw',
        height: '100vh',
        zoom: 17,
        doubleClickZoom: false,
    })

    // stores mode instance 
    const [ mode, setMode ] = useState(null)
    
    // stores index of 'point' 
    const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(null)
    
    // Hook 
    const editorRef = useRef(null)

    const onSelect = useCallback(options => {
        setSelectedFeatureIndex(options && options.selectedFeatureIndex);
    }, []);

    const onDelete = useCallback(() => {
        if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
            editorRef.current.deleteFeatures(selectedFeatureIndex);
        }
    }, [selectedFeatureIndex]);

    const onUpdate = useCallback(({editType}) => {
        if (editType === 'addFeature'){
            setMode(new EditingMode());
        }
    }, []);

    const drawTools = (
        <div className="mapboxgl-ctrl-top-left">
            <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
                <button 
                className="start-button" 
                title="Polygon tool (p)"
                onClick={() => setMode(new DrawPolygonMode())} >S</button>
        
                <button
                className="delete-polygon-button"
                title="Delete"
                onClick={onDelete}
                >D</button>
            </div>
        </div>
    )

    const features = editorRef.current && editorRef.current.getFeatures();
    const selectedFeature = features && (features[selectedFeatureIndex] || features[features.length -1]);
    console.log("Features: ", features)

    const [pageInfo] = useState({
        title: "Draw on a map to define an area or site boundary",
        body: "RHS staff"
    })
    return (
        <>
        <PageHeader info={pageInfo}/>
        {console.log(selectedFeatureIndex)}
        {console.log(selectedFeature)}
        
        <InteractiveMap
            {...viewport}
            mapstyle="mapbox://styles/mapbox/satellite-v9"
            mapboxApiAccessToken={TOKEN}
            onViewportChange={setViewport}
            doubleClickZoom={false}
        >
            {/* Editor component handles drawing task */}
        <Editor 
        ref={editorRef}
        style={{width: '100%', height: '100%'}}
        clickRadius={12}
        mode={mode}
        onSelect={onSelect}
        onUpdate={onUpdate}
        editHandleShape={'circle'}
        // imports style functions to define polygon style conditionally
        featureStyle={getFeatureStyle}
        editHandleStyle={getEditHandleStyle}
        />
        {drawTools}
        
        </InteractiveMap>
        {/* <ControlPanel polygon={selectedFeature} /> */}
            
        </>
        
    )
}

export default DrawPolygon
