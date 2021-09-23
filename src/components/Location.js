import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import Spinner from './Spinner'
import PageHeader from './PageHeader';
import { Link } from 'react-router-dom';


const Location = () => {

    const id = useLocation()
    const formattedUrl = id.pathname.slice(10)
    const [ isLoading, setIsLoading ] = useState(true)

    const [ dbs, setDatabases ] = useState([])
    // const [ location, setLocation ] = useState([])

    const [pageInfo] = useState({
        title: "Current Project",
        body: "From here you can interact with this particular project"
    })

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
             {/* <h1>Hi it's a location</h1>
            <p>URL: {formattedUrl}</p> */}
             <PageHeader info={pageInfo}/>
             <div className="location-container" >
            {dbs.filter(db => db.properties.Name.title[0].plain_text === formattedUrl).map(location => (
                <div key={location.id} className="location" style={{backgroundImage: `url(${location.properties.mainImage.files[0].file.url})`}}>
                    
                    <div className="location-info">
                    <h3>{location.properties.Name.title[0].plain_text}</h3>
                    {/* <img src={location.properties.mainImage.files[0].file.url} alt="" /> */}
                    <p>{location.properties.description.rich_text[0].plain_text}</p>
                    <p>Proposed Number of Houses:{location.properties.numberOfHouses.number}</p>
                    <p>Proposed Number of Houses:{location.properties.numberOfAmenities.number}</p> 
                    {/* <p>Lat: {location.properties.lat.number}</p> 
                    <p>Lng: {location.properties.lng.number}</p> */}
                    </div>

                    <div className="location-grid">
                    <div className="location-feature">
                    {location.properties.phase1.checkbox ? <Link to="#"><p>Site Proposal</p></Link> : <p>false</p>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase1.checkbox ? <Link to="#"><p>Comment on Site</p></Link> : <p>false</p>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase2.checkbox ? <Link to="#"><p>View Comments</p></Link> : <p>false</p>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase2.checkbox ? <Link to="#"><p>Comment on Plans</p></Link> : <p>false</p>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase2.checkbox ? <Link to="#"><p>Propose Layout</p></Link> : <p>false</p>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase3.checkbox ? <Link to="#"><p>true</p></Link> : <p>false</p>}
                    </div>
                    </div>
                </div>
            ))}
            </div>
           
        </div>
    )
}

export default Location
