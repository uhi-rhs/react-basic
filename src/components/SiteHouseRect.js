import React from 'react'

const SiteHouseRect = ({scale, col}) => {
    const size = scale.zoom;
    return (
        <div>
            <svg width="100" height="60">
                <rect width="300" height="100" style={{fill:col,  stroke:"red"}} />
            </svg>
        </div>
    )
}

export default SiteHouseRect
