import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import Spinner from './Spinner'
import PageHeader from './PageHeader';
import { Link } from 'react-router-dom';


const Location = () => {

    // get location name from URL
    const id = useLocation()
    // Format
    const formattedUrl = id.pathname.slice(10)
    // Spinner 
    const [ isLoading, setIsLoading ] = useState(true)
    // Data
    const [ dbs, setDatabases ] = useState([])
    // data for page header
    const [pageInfo] = useState({
        title: `${formattedUrl}`,
        body: "From here you can interact with this particular project"
    })

    useEffect(() => {     
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/project_properties`)
            console.log('result.data', result.data)
            setDatabases(result.data)
            setIsLoading(false)
            }          
            fetchItems() 
        }, [])

    // const imageError = (e) => {
    //     e.target.backgroundImage = `url('default_background.jpeg')`}
    //     console.log('image error function triggered')
    // }
        
    return isLoading? ( <Spinner />
    ) : (
        
        <div>
             <PageHeader info={pageInfo}/>
             <img src="default_background.jpeg" alt="" />
             <div className="location-container" >
            {dbs.filter(db => db.properties.Name.title[0].plain_text === formattedUrl).map(location => (
                <div key={location.id} className="location" style={{backgroundImage: `url(${location.properties.mainImage.files[0].file.url})`}} >

                    {/* EXAMPLE CODE FOR ERROR ON IMAGE onError={(e)=>{e.target.onerror = null; e.target.style={}  */}
                    
                    <div className="location-info">
                    <h3>{location.properties.Name.title[0].plain_text}</h3>
                    {/* <img src={location.properties.mainImage.files[0].file.url} alt="" /> */}
                    <p>{location.properties.description.rich_text[0].plain_text}</p>
                    <p>Proposed Number of Houses:{location.properties.numberOfHouses.number}</p>
                    <p>Proposed Number of Houses:{location.properties.numberOfAmenities.number}</p> 
                    <p>Lat: {location.properties.lat.number}</p> 
                    <p>Lng: {location.properties.lng.number}</p>
                    </div>

                    {/* Grid of active or inactive links to features */}
                    <div className="location-grid">
                    <div className="location-feature">
                    {location.properties.phase1.checkbox ? <Link to={`/location/${formattedUrl}/story`}><div><h3>Site Proposal</h3><p>Details of the project</p></div></Link> : <h3>false</h3>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase1.checkbox ? <Link to={`/location/${formattedUrl}/site_comment`} ><h3>Comment on the Site</h3><p>A Map Based Activity where you can be specific about the location of something</p></Link> : <h3>false</h3>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase2.checkbox ? <Link to={`/location/${formattedUrl}/view_site_comments`}><h3>View Site Comments</h3><p>See what other people are saying, on a map</p></Link> : <h3>false</h3>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase2.checkbox ? <Link to={`/location/${formattedUrl}/basic_comments`}><h3>Basic Comment</h3><p>Nothing Fancy, just a comment re this project</p></Link> : <h3>false</h3>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase2.checkbox ? <Link to={`/location/${formattedUrl}/view_basic_comments`}><h3>View Basic Comments</h3><p>See what other people are saying</p></Link> : <h3>false</h3>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase2.checkbox ? <Link to="#"><h3>Propose Layout</h3><p>We'd like to get your ideas for house positions etc</p></Link> : <h3>false</h3>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase3.checkbox ? <Link to="#"><h3>Other Feature</h3><p>TBC</p></Link> : <h3>false</h3>}
                    </div>
                    <div className="location-feature">
                    {location.properties.phase3.checkbox ? <Link to={`/location/${formattedUrl}/form_view`}><h3>Survey</h3><p>...</p></Link> : <h3>false</h3>}
                    </div>
                    </div>
                </div>
            ))}
            </div>
           
        </div>
    )
}

export default Location
