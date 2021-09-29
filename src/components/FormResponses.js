import React, {useState} from 'react'
import PageHeader from './PageHeader'

const FormResponses = () => {

    const [pageInfo] = useState({
        title: "Survey Responses",
        body: "Displays data / visualisations captured by google form(s)"
    })


    return (
        <div>
            <PageHeader info={pageInfo}/>
            <h2>Chart showing responses...</h2>
         </div>
    )
}

export default FormResponses


