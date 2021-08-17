import React, {useState} from 'react'
import image1 from '../images/crusher-overview.png';
import image2 from '../images/crusher-building-elevation.png';
import StoryPage1 from './StoryPage1';
import StoryPage2 from './StoryPage2';
import StoryPage3 from './StoryPage3';
import StoryPageVideo from './StoryPageVideo';
import PageHeader from './PageHeader';

const Story = () => {

    const [pageInfo] = useState({
        title: "Example of a project outline",
        body: "Pre feedback information"
    })

    // hard coded data for testing
    const [story, setStory] = useState({
        name: "The Crusher Site Option 1 Terrace",
        client: "The Glenuig COmmunity and PH38 Development Company",
        title: "Crusher Site",
        intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image1: image1,
        text1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image2: image2,
        text2: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        text3: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        vimeolink: "https://player.vimeo.com/video/472571278?h=0585134895"
    })

    const [step, setStep] = useState(1)

    console.log(step)

    // Move to next page
    const nextPage = () => {
        const newStep = step;
        setStep({
            step: (newStep + 1)
        });
    }

    // Move to previous page
    const prevPage = () => {
        const { step } = step;
        setStep({
            step: step - 1
        });
    }

    switch(step) {
        case 1: 
            console.log('step 1')
            return (
                <div className="container">
                <PageHeader info={pageInfo}/>
                <StoryPage1 
                    pageContent={story}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    />
                </div>
            )
        case 2: 
            console.log('step 2')
            return (
                <div className="container">
                    <PageHeader info={pageInfo}/>
                    <StoryPage2 pageContent={story}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    />
                </div>
            )
        case 3: 
            return (
                <div className="container">
                <PageHeader info={pageInfo}/>
                <StoryPage3 pageContent={story}
                nextPage={nextPage}
                prevPage={prevPage}
                />
                </div>
            )
        case 4: 
            return (
                <div className="container">
                <PageHeader info={pageInfo}/>
                <StoryPageVideo pageContent={story}
                nextPage={nextPage}
                prevPage={prevPage}
                />
                </div>
            )
    }
}

export default Story
