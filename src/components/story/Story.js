import React, {useState, useEffect} from 'react'
import StoryPage1 from './StoryPage1';
import StoryPage2 from './StoryPage2';
import StoryPage3 from './StoryPage3';
import StoryPageVideo from './StoryPageVideo';
import PageHeader from '../PageHeader';
import Spinner from '../Spinner'

import sanityClient from "../../readClient"

const Story = () => {

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

    const [pageInfo] = useState({
        title: "Example of a project outline",
        body: "Pre feedback information"
    })

    const [step, setStep] = useState(1)
    const [story, setStory] = useState(null)
    
    console.log(story)
    console.log(step)
   
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
            description,
            slug,
            client,
            intro,
            secondImage{
                asset->{
                    _id,
                    url
                }
            },
            text1,
            plan1{
                asset->{
                    _id,
                    url
                }
            },
            text2,
            text3,
            videoUrl


        }`)

    .then((data) => setStory(data[0]))
    .catch(console.error)
    },[rhsUser.project._ref])

    // Move to next page
    const nextPage = () => {
        const newStep = step;
        setStep(newStep + 1);
    }

    // Move to previous page
    const prevPage = () => {
        const newStep = step;
        setStep(newStep - 1);
    }
    if(!story){
        return <div>loading</div>
    }

    if (step === 1) {
        return  <div className="story">
        <PageHeader info={pageInfo}/>
        <StoryPage1 
            pageContent={story}
            nextPage={nextPage}
            prevPage={prevPage}
            />
        </div>
    }
    if (step === 2) {
        return    <div className="story">
            {console.log("Step 2", story)}
        <PageHeader info={pageInfo}/>
        <StoryPage2 pageContent={story}
        nextPage={nextPage}
        prevPage={prevPage}
        />
    </div>
    }
    if (step === 3) {
        return <div className="story">
        <PageHeader info={pageInfo}/>
        <StoryPage3 pageContent={story}
        nextPage={nextPage}
        prevPage={prevPage}
        />
        </div>
    }
    if (step === 4) {
        return <div className="story">
        <PageHeader info={pageInfo}/>
        <StoryPageVideo pageContent={story}
        nextPage={nextPage}
        prevPage={prevPage}
        />
        </div>
    }
    return <Spinner />
    
}

export default Story