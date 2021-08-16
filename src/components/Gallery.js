import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PageHeader from './PageHeader'

const Gallery = () => {

    const [ images, setImages ] = useState([])
    
    const [pageInfo] = useState({
        title: "Gallery",
        body: "Images from the Database"
    })

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/images_test`)
            console.log(result)
            setImages(result.data)
        }
        fetchItems()
        console.log("use effect")
    }, [])

    return (
        
        <div>
            <PageHeader info={pageInfo} />
            {console.log('page info', pageInfo)}
         <h1> NOTE: Images stored in Notion pages / databases are not currently accessible through the Notion API </h1>
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
