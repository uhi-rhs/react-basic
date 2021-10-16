import React, {useState} from 'react'

const BuildingMaterials = () => {

    const [ images, setImages ] = useState()

    const [ loading, setLoading ] = useState(true)

    setImages(123)
    setLoading(false)
    console.log(images, loading)
    
    return (
        <div>
            
        </div>
    )
}

export default BuildingMaterials
