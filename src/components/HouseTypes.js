import React, {useState, useEffect} from 'react'
import HouseVote from './HouseVote'
import PageHeader from './PageHeader'
import sanityClient from "../readClient"

const HouseTypes = () => {

    // Display data
    const [pageInfo] = useState({
        title: "Look at these housetypes",
        body: "Showing house types for feedback"
    })

    const [ houses, setHouses ] = useState([])

    useEffect(()=> {
        sanityClient
        .fetch(`*[_type == "precedent"]{
            name,
            alt, 
            slug,
            _id,
            image{
                asset->{
                    _id,
                    url
                }
            }
        }`)
        .then((data)=> setHouses(data))
        .catch(console.error)
    },[])

    const [ show, setShow ] = useState(false)
   
    const [selectedHouse, setSelectedHouse] = useState({
        name: "",
        alt: "",
        image: {
            asset: {
                _id: "",
                url: ""
            }
        }
     })

    const handleClick = (e) => {
        console.log(e)
        setSelectedHouse(e)
        showModal() 
    }

    const showModal = () => {
        setShow(true)
    }

    const hideModal = () => {
        setShow(false)
    }

    if(!houses) return <div>loading...</div>
    return (
        <div className="container">
            <PageHeader info={pageInfo}/>
            <HouseVote show={show} handleClose={hideModal} selectedHouse={selectedHouse} >
                <p>House Vote</p>
            </HouseVote>
           
            
            <div className="image-grid">
                <div className="image" style={{background: "red", width: "100%"}}>
                    <h4 className="house-title" >Instructions</h4>
                    <p className="house-para">
                        Click on a house to select your favourite house type. 
                    </p>
                </div>
                {houses.map((house, index) => (
                    <div className="image" key={index} onClick={() => handleClick(house)}>
                        <h4 className="house-title">{house.name}</h4>
                        <p className="house-para">{house.alt}</p>
                        <img src={house.image.asset.url} alt={house.alt} />
                    </div>
                ))}
            
            </div>
        </div>
    )
}

export default HouseTypes
