import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader'
import axios from 'axios';
import Spinner from './Spinner'

const FormView = (props) => {

    const [pageInfo] = useState({
        title: "Survey",
        body: props.location.properties.Name.title[0].plain_text
    })
    
    console.log("Props from form view",props)
    const [ isLoading, setIsLoading ] = useState(true)
   

    // Add useEffect hook to load data from Notion w filter / single query for correct form URL

    const [surveys, setSurveys] = useState(null)

    useEffect(() => {     
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/surveys`)
            console.log('result.data', result.data)
            setSurveys(result.data)
            
            setIsLoading(false)
            }          
            fetchItems() 
        }, [])

    console.log("Surveys:",surveys)

    return isLoading? ( <Spinner />
        ) : (
        <div className="form-view-container">
            <PageHeader info={pageInfo}/>
            <div className="form-view"> 
                <iframe title="survey" src={surveys[0].properties.URL.url} width="640" height="1054" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
        </div>
    )
}

export default FormView
