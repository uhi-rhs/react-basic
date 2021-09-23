import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import Spinner from './Spinner'
import { Link } from 'react-router-dom';


const Location = () => {

    const id = useLocation()
    const formattedUrl = id.pathname.slice(10)
    const [ isLoading, setIsLoading ] = useState(true)

    const [ dbs, setDatabases ] = useState([])
    // const [ location, setLocation ] = useState([])

        useEffect(() => {
            
            const fetchItems = async () => {
                const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/project_properties`)
                console.log('result.data', result.data)
                const resultArr = result.data
                console.log(resultArr)
                setDatabases(result.data)
                setIsLoading(false)
            }          
            fetchItems()
           
            console.log('fetched')
        
        }, [])
        console.log('26', dbs)
        
        
    return isLoading? ( <Spinner />
    ) : (
        
        <div>
             <h1>Hi it's a location</h1>
            <p>URL: {formattedUrl}</p>
            {dbs.filter(db => db.properties.Name.title[0].plain_text === formattedUrl).map(location => (
                <div key={location.id}>
                    <h3>{location.properties.Name.title[0].plain_text}</h3>
                    <img src={location.properties.mainImage.files[0].file.url} alt="" />
                    <p>{location.properties.description.rich_text[0].plain_text}</p>
                    <p>Proposed Number of Houses:{location.properties.numberOfHouses.number}</p>
                    <p>Proposed Number of Houses:{location.properties.numberOfAmenities.number}</p> 
                    <p>Lat: {location.properties.lat.number}</p> 
                    <p>Lng: {location.properties.lng.number}</p>
                    {location.properties.phase1.checkbox ? <Link to="#"><p>true</p></Link> : <p>false</p>}
                    {location.properties.phase2.checkbox ? <Link to="#"><p>true</p></Link> : <p>false</p>}
                    {location.properties.phase3.checkbox ? <Link to="#"><p>true</p></Link> : <p>false</p>}
                </div>
            ))}
           
        </div>
    )
}

export default Location
