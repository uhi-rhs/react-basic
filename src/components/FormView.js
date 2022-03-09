import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader'
import Spinner from './Spinner'
import sanityClient from "../readClient"


const FormView = ({user}) => {

    const [pageInfo] = useState({
        title: "Survey",
        body: "formattedUrl"
    })

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })
       
    // Add useEffect hook to load data from Notion w filter / single query for correct form URL
    const [survey, setSurvey] = useState(null)
    const [projectName, setProjectName] = useState(null)
    console.log(survey)

    useEffect(()=>{
        sanityClient
        .fetch(`*[_type == "survey"]{
            url, 
        }`)
        .then((data)=> setSurvey(data[0]))
    },[])

    console.log(rhsUser)

    useEffect(()=>{
        sanityClient
        .fetch(`*[_type == "project" && _id == "${rhsUser.project._ref}"]{
            name
        }`)
        .then((data) => setProjectName(data[0]))
    },[rhsUser.project._ref])

// Add code to slice up the survey URL from the db (get a new URL from googleforms with pre filled fields)

    const urlFormatter = () => {
        if(!rhsUser){
            return
        }else{
        const part1 = "https://docs.google.com/forms/d/e/1FAIpQLSeJH2pvvdrKa5qtvSgSMDo5xQNWAhhMlE3yKDcRE2T3IbfvkA/viewform?usp=pp_url&entry.231250132="
        const part3 = "&entry.141039251="
        return part1 + rhsUser.username + part3 + projectName.name
        }
    }

    if(!projectName) return <div>loading...</div>

    return (
            <div className="form-view-container">
            <PageHeader info={pageInfo}/>
            <div className="form-view"> 
                <iframe title="survey" src={urlFormatter()} width="640" height="1054" frameBorder="0" marginHeight="0" marginWidth="0"><Spinner /></iframe>
            </div>
            </div>
    )
}

export default FormView
