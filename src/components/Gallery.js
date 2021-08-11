import React, {useState, useEffect} from 'react'
import axios from 'axios';

const Gallery = () => {

    const [ images, setImages ] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`http://localhost:5000/api/rhs/images_test`)
            console.log(result)
            setImages(result.data)
        }
        fetchItems()
        console.log("use effect")
    }, [])

    return (
        <div>
            <h1>Hi</h1>
                {console.log(images)}
                {images.map((image) => (
                    <div key={image.properties.image.files[0].name}>
                        <h1>Image</h1>
                        <p>{image.properties.url.url}</p>
                        <img src={image.properties.url.url} alt="temp" />

                    </div>
                ))}
         
        </div>
    )
}

export default Gallery
