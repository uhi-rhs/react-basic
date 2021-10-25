import React, { useState } from 'react'
import mapboxgl from 'mapbox-gl'
import MapGL from "react-map-gl"
import { Editor, EditingMode, DrawLineStringMode, DrawPolygonMode } from "react-map-gl-draw"

//eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const MODES = [
    { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
    { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
    { id: "editing", text: "Edit Feature", handler: EditingMode }
]

const DrawPolygonBasic = () => {

    // Mapbox viewport settings
    const [ viewport, setViewport ] = useState({
        longitude: -7.2986658,
        latitude: 57.0860345,
        width: '100vw',
        height: '100vh',
        zoom: 17,
    })

    // Mode ID for select feature
    const [ modeId, setModeId ] = useState(null)
    // stores mode handler 
    const [ modeHandler, setModeHandler ] = useState(null)
    
    // Function handles mode switch
    const switchMode = (e) => {
        const _modeId = e.target.value === modeId ? null : e.target.value;
        const mode = MODES.find((m) => m.id === _modeId);
        const modeHandler = mode ? new mode.handler() : null;
        setModeId( _modeId );
        setModeHandler(modeHandler);
    }

    // toolbar component
    const renderToolbar = () => {
        return (
            <div style={{ position: "absolute", top: 4, right: 4, maxWidth: "400px" }}>
                <select onChange={switchMode}>
                    <option>Choose a draw mode</option>
                    {MODES.map((mode) => (
                        <option key={mode.id} value={mode.id}>
                            {mode.text}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
    // Main render
    return (
        <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapstyle="mapbox://styles/mapbox/satellite-v9"
        onViewPortChange={setViewport}>
            {/* Editor component does the drawing work */}
            <Editor 
            clickRadius={12}
            mode={modeHandler}
            onSelect={() => {}}
            />
            {renderToolbar()}
        </MapGL>
    )
}

export default DrawPolygonBasic
