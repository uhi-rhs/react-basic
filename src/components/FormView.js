import React, {useState} from 'react'
import PageHeader from './PageHeader'

const FormView = () => {

    const [pageInfo] = useState({
        title: "Survey",
        body: "Kindrochit Court - Braemar"
    })

    return (
        <div className="container">
            <PageHeader info={pageInfo}/>
            <div className="form-view"> 
                <iframe title="survey" src="https://docs.google.com/forms/d/e/1FAIpQLSfo6GENrVlpfu7HCq4pwvuNsmXUhUJJKP5LYwbma0MC_i-fmw/viewform?embedded=true" width="640" height="1054" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
        </div>
    )
}

export default FormView
