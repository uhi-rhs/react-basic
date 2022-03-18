import React, {useEffect, useState} from 'react'
import PageHeader from './PageHeader'
import sanityClient from "../readClient"
import {FaStar} from 'react-icons/fa'
import BlockContent from "@sanity/block-content-to-react"; 

const SurveyResponses = () => {

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

    const [pageInfo] = useState({
        title: "Survey Responses",
        body: ""
    })

    const [ responses, setResponses ] = useState()

    useEffect(() => {     
        sanityClient
        .fetch(`*[_type == "surveyReport" && project._ref == "${rhsUser.project._ref}"]{
            name,
            project->{
                name
            },
            energyEfficiency,
            extend,
            workSpace,
            roomSize,
            materials,
            gardenSpace,
            renewables,
            communityFunction,
            trees,
            accessibility,
            other,
            exposure,
            ecology,
            roadsImpact,
            overshadowing,
            size,
            workshops,
            noNeed,
            differentLocation,
            capacity,
            timescale,
            other2
        }`)
        .then((data)=> setResponses(data[0]))
        }, [rhsUser.project._ref])

    const stars = (int) => {
        const arr = Array.from(Array(int).keys())
        return arr.map((a, i)=>(
            <div className="markers">
                <FaStar style={{height: '1em', width: '1em', color: `#${Math.random().toString().slice(-7,-1)}`}} />
            </div>
        ))
    }

   if(!responses) return <div>Loading...</div>

   console.log(responses.energyEfficiency)
    return (
        <div className="survey-responses-container">
            <PageHeader info={pageInfo}/>
            <div className="survey-report-container" >
                <div className="survey-report-header">
                <h2>{responses.project.name}</h2>
                <p>{responses.name}</p>
                </div>
               
                <div className="responses-grid">
                    <h2>Priorities</h2>
                    <div className="question">
                        <h4>Energy Efficiency for comfort and low heating / electricity bills</h4>
                        <div className="markers">
                        {stars(responses.energyEfficiency)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Ability for houses to be extended in the future</h4>
                        <div className="markers">
                        {stars(responses.extend)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Space to be able to work from home'</h4>
                        <div className="markers">
                        {stars(responses.workSpace)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Generous room sizes and ceiling heights</h4>
                        <div className="markers">
                        {stars(responses.roomSize)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Use of affordable, natural, Scottish building materials</h4>
                        <div className="markers">
                        {stars(responses.materials)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Private garden space</h4>
                        <div className="markers">
                        {stars(responses.gardenSpace)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Incorporation of renewable energy generation</h4>
                        <div className="markers">
                        {stars(responses.renewables)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Use of part of the site for specific community function</h4>
                        <div className="markers">
                        {stars(responses.communityFunction)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Selective planting of trees to provide shelter</h4>
                        <div className="markers">
                        {stars(responses.trees)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Full accessibility by all ages</h4>
                        <div className="markers">
                        {stars(responses.accessibility)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Other</h4>
                        <BlockContent blocks={responses.other}/>
                    </div>
                </div>
                <div className="responses-grid">
                    <h2>Concerns</h2>
                    <div className="question">
                        <h4>Exposure of the site to prevailing winds</h4>
                        <div className="markers">
                        {stars(responses.exposure)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Impact of the new buildings on the ecology of the site</h4>
                        <div className="markers">
                        {stars(responses.ecology)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Impact of construction traffic on existing roads</h4>
                        <div className="markers">
                        {stars(responses.roadsImpact)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Overshading of buildings by trees</h4>
                        <div className="markers">
                        {stars(responses.overshadowing)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Site isn't large enough for all these houses</h4>
                        <div className="markers">
                        {stars(responses.size)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Where do the workshops get relocated to?</h4>
                        <div className="markers">
                        {stars(responses.workshops)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>There is no housing need in this location</h4>
                        <div className="markers">
                        {stars(responses.noNeed)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Houses would be better in a different location</h4>
                        <div className="markers">
                        {stars(responses.differentLocation)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Capacity of existing power / drainage / water supply to serve new buildings</h4>
                        <div className="markers">
                        {stars(responses.capacity)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Timescale for building the houses</h4>
                        <div className="markers">
                        {stars(responses.timescale)}
                        </div>
                    </div>
                    <div className="question">
                        <h4>Other</h4>
                       <BlockContent blocks={responses.other2}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SurveyResponses
