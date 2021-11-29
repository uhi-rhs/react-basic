import React, {useEffect, useState, useContext} from 'react'
import Spinner from './Spinner'
import axios from 'axios'
import PageHeader from './PageHeader'
import {serverContext} from '../App'
import { useLocation } from 'react-router-dom'

const SurveyResponses = () => {

    const [pageInfo] = useState({
        title: "Survey Responses",
        body: "Displays data "
    })

    const server = useContext(serverContext)

    const [ isLoading, setIsLoading ] = useState(true)

    const [ responses, setResponses ] = useState()

    const id = useLocation()
    const formattedUrl = id.pathname.slice(10, -12)

    useEffect(() => {     
        const fetchItems = async () => {
            const result = await axios(`${server}/api/rhs/survey_responses`)
            console.log('result.data', result.data)  
            setResponses(result.data)
            setIsLoading(false)
            setQuestions(getObjectKeys(result.data))
            }          
            fetchItems() 
        }, [formattedUrl, server])

    console.log(responses)

    const getObjectKeys = (arr) => {
        let keys = []
        let obj = arr[2]
        for (let k in obj.properties) keys.push(k)
        keys.sort()
        return keys
    }

    const [ questions, setQuestions ] = useState(null)
    console.log(questions)


   const markers = (int) => {
       var stars = []
       for (var i = 0; i < int; i++) {
           stars.push(<h1 key={i}>*</h1>);
       }
       return (
           <div className="markers">
               {stars}
           </div>
       )
   }
 
    return isLoading ? <Spinner /> : 
    (
        <div className="survey-responses-container">
            <PageHeader info={pageInfo}/>

        <div>
            {responses && responses.map((response, index) => (
                <div key={index} className="question-container">
                    <div className="answer">
                    <h2>{response.properties.Options.rich_text[0].plain_text}</h2>
                    <h2>{response.properties.Count.number}</h2>
                    {markers(response.properties.Count.number)}
                    
                    </div>
                </div>
            ))}
        </div>

        </div>
    )
}

export default SurveyResponses
