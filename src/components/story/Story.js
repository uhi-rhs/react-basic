import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import StoryPage1 from './StoryPage1';
import StoryPage2 from './StoryPage2';
import StoryPage3 from './StoryPage3';
import StoryPageVideo from './StoryPageVideo';
import PageHeader from '../PageHeader';
import axios from 'axios';
import Spinner from '../Spinner'

const Story = (props) => {

    const [pageInfo] = useState({
        title: "Example of a project outline",
        body: "Pre feedback information"
    })

    const id = useLocation()
    const formattedUrl = id.pathname.slice(10, -6)

    const [step, setStep] = useState(null)
    const [story, setStory] = useState(null)

    useEffect(() => {     
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/stories/${formattedUrl}`)
            setStory(result.data)
            setStep(1)
            }          
            fetchItems() 
        }, [formattedUrl])

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