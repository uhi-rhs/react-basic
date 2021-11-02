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
            // const filteredData = result.data.filter(data => data.properties.Project.select.name === formattedUrl)
            console.log('result.data', result.data)
            // console.log(result.data[0].properties.Project.select.name)
            // console.log(filteredData)  
            setResponses(result.data)
            // dataParser(filteredData)
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

    // const countResponses = (arr) => {
    //     let count = {}
    //     for(let i = 0; i < arr.length; i++){
    //         if(count[arr[i]].properties.)
    //     }
    // }

 
    return isLoading ? <Spinner /> : 
    (
        <div>
            <PageHeader info={pageInfo}/>
        <div>
            {questions.map((question, index) => (
                <div>
                    <h2>{question}</h2>
                </div>
            ))}
        </div>

        </div>
    )
}

export default SurveyResponses
