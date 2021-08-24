import React, {useState} from 'react'
import PageHeader from './PageHeader'
import image1 from "../images/crusher-overview.png"


const LandingPage = () => {

    const [pageInfo] = useState({
        title: "Landing Page",
        body: "Find out more about this project"
    })


    const [pages] = useState([
       
       {id:1, name:'Story'},
      {id:2, name:'Map'},
       {id:3, name:'Proposal'},
       {id:4, name:'Comment Map'},
       {id:5, name:'Comment'},
       {id:6, name:'Amenities'},
      {id:7, name:'Historical'},
       {id:8, name:'Environmental'}
    ])


    return (
        <div className="landing-page">
             <PageHeader info={pageInfo}/>
             <div className="landing-page-header">
                 <img src={image1} alt=""/>
                 <div className="landing-page-header-text">
                 <h3>{pageInfo.title}</h3>
                 <p>{pageInfo.body}</p>
                 </div>
                
             </div>
            <div className="landing-page-container">
            <div className="landing-page-grid">
            {pages.map((page) => (
                    <div 
                    key={page.id}
                    className="page"
                    >
                    {page.name}
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default LandingPage
