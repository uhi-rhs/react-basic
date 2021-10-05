import React, {useState, useEffect} from 'react'
// import image1 from '../../images/crusher-overview.png';
// import image2 from '../../images/crusher-building-elevation.png';
import StoryPage1 from './StoryPage1';
import StoryPage2 from './StoryPage2';
import StoryPage3 from './StoryPage3';
import StoryPageVideo from './StoryPageVideo';
import PageHeader from '../PageHeader';
import axios from 'axios';

const Story = (props) => {

    const [pageInfo] = useState({
        title: "Example of a project outline",
        body: "Pre feedback information"
    })
    // console.log("Story", props)
    console.log("Props:", props)
    const url = props.location.properties.Name.title[0].plain_text
    const [step, setStep] = useState(null)

    const [story, setStory] = useState(null)

    console.log("Story:", story)

    // State (story) is not persisting when setStep is called, I think. Look into React Redux + local storage

    useEffect(() => {     
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/stories`)
            console.log('result.data', result.data)
            const filteredData = result.data.filter(story => story.properties.Name.title[0].plain_text === url)
            setStory(filteredData)
            // setIsLoading(false)
            setStep(1)
            }          
            fetchItems() 
        }, [])



    // console.log(step)

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
    return <div><h1>No Data</h1></div>
    
}

export default Story




// {
//     name: "The Crusher Site Option 1 Terrace",
//     client: "The Glenuig Community and PH38 Development Company",
//     title: "Crusher Site",
//     intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     image1: image1,
//     text1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     image2: image2,
//     text2: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     text3: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     vimeolink: "https://player.vimeo.com/video/472571278?h=0585134895"
// }