import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader';
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

// Icons
import { FaInfo, FaMapMarkerAlt, FaRegComments, FaRegImage, FaRegCommentDots, FaRegChartBar, FaThumbtack, FaClipboardList } from 'react-icons/fa'
import sanityClient from "../readClient"
import BlockContent from "@sanity/block-content-to-react"; 


const Location = () => {

    const [pageInfo] = useState({
        title: "Project Home Page",
        body: "From here you can interact with this particular project"
    })

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

    const [project, setProject] = useState()

    useEffect(()=> {
        sanityClient
        .fetch(`*[_type == "project" && _id == "${rhsUser.project._ref}"]{
            name,
            location->{
                name
            },
            image{
                asset->{
                    _id,
                    url
                }
            },
            numberOfHouses,
            numberOfAmeneties,
            lat,
            lng,
            phase1,
            phase2,
            description,
            slug,
            client
        }`)
    .then((data) => setProject(data[0]))
    .catch(console.error)
    },[rhsUser.project._ref])
 
    if(!project) return <div>loading...</div>
    return (
        
        <div>
             <PageHeader info={pageInfo}/>
             <img src="default_background.jpeg" alt="" className="location-background-image"/>
             <div className="location-container" >
                <div className="location" style={{backgroundImage: `url(${project.image.asset.url})`}} >                    
                    <div className="landing-page-header">
                        <img src={project.image.asset.url} alt={project.name} />
                        <div  className="landing-page-header-text">
                        <h3>{project.name}</h3>
                        <BlockContent blocks={project.description} projectId="" dataset="production" className=""/>
                        </div>
                        <div className="info-box">
                            <ul>
                            <li>
                                    Location: {project.location.name}
                                </li>
                                <li>
                                    Houses: {project.numberOfHouses}
                                </li>
                                <li>
                                    Ameneties: {project.numberOfAmeneties}
                                </li>
                                <li>
                                    Client: {project.client}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Grid of active or inactive links to features */}
                   
                    <div className="location-grid">
            
                    {/* Always visible */}
                    <div className="location-feature">
                        <Link to={`/location/story`}>
                            <div>
                            <FaInfo id="FaInfo" label="Info" style={{height: '3em', width: '3em', color: '#ffffff'}}/>

                            <h3>Site Project</h3>
                            <p>Details of the project</p>
                            </div>
                        </Link> 
                    </div>

                    {/* Phase 2 */}
                    
                    {project.phase2 ? 
                    <div className="location-feature">
                    <Link to={`/location/view_site_comments`}>
                        <div>
                        <FaMapMarkerAlt id="FaMapMarkerAlt" label="Map" style={{height: '3em', width: '3em', color: '#ffffff'}}/>

                        <h3>View Site Comments</h3>
                        <p>See what other people are saying, on a map</p>
                        </div>
                    </Link>
                    </div>
                     : <div className="hidden-div"></div>}
                    
                    
                    {project.phase2 ? 
                    <div className="location-feature">
                    <Link to={`/location/view_basic_comments`}>
                        <FaRegComments id="FaRegComments" label="Comments" style={{height: '3em', width: '3em', color: '#ffffff'}}/>

                        <h3>View Comments</h3>
                        <p>See what other people are saying</p>
                    </Link>
                    </div>
                    : <div className="hidden-div"></div>}
                    
                    
                    {project.phase2 ? 
                    <div className="location-feature">
                    <Link to={`/location/house_votes`}>
                        <FaRegImage id="FaRegImage" label="picture" style={{height: '3em', width: '3em', color: '#ffffff'}} />
                        <h3>View House Type Feedback</h3>
                        <p>Feedback on house types for this site</p>
                        </Link>
                        </div> 
                    : <div className="hidden-div"></div>}
                    
                    
                    {project.phase2 ? 
                    <div className="location-feature">
                    <Link to={`/location/survey_responses`}>
                    <FaRegChartBar id="FaRegChartBar" label="Survey Responses" style={{height: '3em', width: '3em', color: '#ffffff'}}/>
                        <h3>Survey Responses</h3>
                        <p>...</p>
                    </Link></div>
                    : <div className="hidden-div"></div>}


                    {/* Phase 1 */}

                    <div className="location-feature">
                    {project.phase1 ? 
                    <Link to={`/location/site_comment`} >
                        <div>
                        <FaThumbtack id="FaThumbtack" label="Pin" style={{height: '3em', width: '3em', color: '#ffffff'}}/>
                        <h3>Comment on the Site</h3>
                        <p>A Map Based Activity where you can comment on the location</p>
                        </div>
                    </Link> :  <div className="closed">
                        <FaThumbtack id="FaThumbtack" label="Pin" style={{height: '3em', width: '3em', color: '#ffffff'}}/>
                        <h3>Comments are closed for this Site</h3>
                        </div>
                    }
                    </div>

                    <div className="location-feature">
                    {project.phase1 ? 
                    <Link to={`/location/basic_comment`}>
                        <div>
                        <FaRegCommentDots id="FaRegCommentDots" label="Comment" style={{height: '3em', width: '3em', color: '#ffffff'}}/>

                        <h3>General Comment</h3>
                        <p>For making comments not specific to the site itself</p>
                        </div>
                    </Link> : <div className="closed">
                        <FaRegCommentDots id="FaRegCommentDots" label="Comment" style={{height: '3em', width: '3em', color: '#ffffff'}}/>

                        <h3>General Comments are closed for this site</h3>
                        </div>}
                    </div>

                    <div className="location-feature">
                    {project.phase1 ? 
                    
                    <Link to={`/location/form_view`}>
                    <div>
                    <FaClipboardList id="FaClipboardList" label="Survey" style={{height: '3em', width: '3em', color: '#ffffff'}}/>

                        <h3>Survey</h3>
                        <p>We'd like your responses to some detailed questions</p>
                    </div>
                    </Link> : 
                    <div className="closed">
                      <FaClipboardList id="FaClipboardList" label="Survey" style={{height: '3em', width: '3em', color: '#ffffff'}}/>

                      <h3>Survey</h3>
                  </div>
                    }
                    </div>

                    <div className="location-feature">
                    {project.phase1 ? 
                    <Link to={`/location/house_types`}>
                        <div>
                        <FaRegImage id="FaRegImage" label="picture" style={{height: '3em', width: '3em', color: '#ffffff'}} />
                        <h3>Comment on House Type</h3>
                        <p>We'd like to get your ideas on the type of house(s) for this site</p>
                        </div>
                        </Link> :    <div className="closed">
                        <FaRegImage id="FaRegImage" label="picture" style={{height: '3em', width: '3em', color: '#ffffff'}} />
                        <h3>Comments are closed on house types</h3>
                        </div>}
                    </div>

                    {/* <div className="location-feature">
                        {project.phase1 ? 
                        <Link to="#">
                            <div>
                            <BsFillHouseFill id="BsFillHouseFill" label="house"style={{height: '3em', width: '3em', color: '#ffffff'}} />
                            <h3>Propose Layout</h3>
                            <p>We'd like to get your ideas for house positions etc</p>
                            </div>
                        </Link> :    <div className="closed">
                            <BsFillHouseFill id="BsFillHouseFill" label="house"style={{height: '3em', width: '3em', color: '#ffffff'}} />
                            <h3>Proposals are closed</h3>
                            </div>}
                    </div> */}

                    </div>
                </div>
            ))
            {/* } */}
            </div>
           
        </div>
    )
}

export default withAuthenticationRequired(Location, {
    onRedirecting: () => <div>Loading...</div>
});
