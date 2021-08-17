import React, {useState} from 'react'
import image1 from './images/crusher-overview';
import image2 from './images/crusher-overview';
import StoryPage1 from './StoryPage1';
import StoryPageVideo from './StoryPageVideo';


const Story = () => {


    const [pageInfo] = useState({
        title: "Example of a project outline",
        body: "Pre feedback information"
    })

    const [story, setStory] = useState({
        name: "The Crusher Site Option 1 Terrace",
        client: "The Glenuig COmmunity and PH38 Development Company",
        title: image1,
        intro: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image1: "image url",
        text1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image2: image2,
        text2: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        text3: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        vimeolink: "https://player.vimeo.com/video/472571278?h=0585134895"
    })

    const [step] = useState(1)

    // Move to next page
    const nextPage = () => {
        const { step } = step;
        this.setStep({
            step: step + 1
        });
    }

    const prevPage = () => {
        const { step } = step;
        this.setStep({
            step: step - 1
        });
    }

    switch(step) {
        case 1: 
            return (
                <StoryPage1 
                    pageContent={story.name, story.client}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    />
            )
        case 2: 
            return (
                <div>
                    
                </div>
            )
        case 3: 
            return (
                <div>
                    
                </div>
            )
        case 4: 
            return (
                <div>
                    
                </div>
            )


    }

  
}

export default Story
