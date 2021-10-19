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


    // const dataParser = (arr) => {
    //     let count = {}
    //     for(let i = 0; i < arr.length; i++){
    //        // TO DO

    //     }
    // }

    useEffect(() => {     
        const fetchItems = async () => {
            const result = await axios(`${server}/api/rhs/survey_responses`)
            const filteredData = result.data.filter(data => data.properties.Project.select.name === formattedUrl)
            console.log('result.data', result.data)
            console.log(result.data[0].properties.Project.select.name)
            setResponses(filteredData)
            // dataParser(filteredData)
            setIsLoading(false)
            }          
            fetchItems() 
        }, [formattedUrl, server])

    console.log(responses)
 
    return isLoading ? <Spinner /> : 
    (
        <div>
            <PageHeader info={pageInfo}/>
        

        </div>
    )
}

export default SurveyResponses
