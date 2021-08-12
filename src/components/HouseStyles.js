import React, {useState} from 'react'
import image1 from '../images/houses/h-1-terrace.jpg'
import image2 from '../images/houses/h-2-barn.jpg'
import image3 from '../images/houses/h-3-wood-terrace.jpg'
import image4 from '../images/houses/h-4-l-shape.jpg'
import image5 from '../images/houses/h-5-estate.jpg'
import image6 from '../images/houses/h-6-black-houses.jpg'
import image7 from '../images/houses/h-7-timber-glass.jpg'
import image8 from '../images/houses/h-8-render.jpg'
import image9 from '../images/houses/h-9-braemar.jpg'
import image10 from '../images/houses/h-10-white-angles.jpg'
import image11 from '../images/houses/h-11-timber.jpg'
import image12 from '../images/houses/h-12-isolated.jpg'
import PageHeader from './PageHeader'


const HouseStyles = () => {

    const [pageInfo] = useState({
        title: "House Types",
        body: "Showing different house types"
    })

    const [images ] = useState([
        image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12
    ])
    console.log(images[1])

    // const img1 =  {
    //     url: image1,
    //     id: 1
    // }


    return (
        <div className="container">
            <PageHeader info={pageInfo}/>
            <div className="image-grid">
            {images.map((image) => (
                    <div className="image" key={image.slice(-8,-4)}>
                        <img src={image} alt="" />
                    </div>
            ))}
            </div>          
        </div>
    )
}

export default HouseStyles
