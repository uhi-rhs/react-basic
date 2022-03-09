import React, {useState, useEffect} from 'react'
import HouseVote from './HouseVote'
import PageHeader from './PageHeader'
import sanityClient from "../readClient"

const HouseTypes = (props) => {

    const [pageInfo] = useState({
        title: "Look at these housetypes",
        body: "Showing house types for feedback"
    })

    const [ houses, setHouses ] = useState([])

    useEffect(()=> {
        sanityClient
        .fetch(`[_type == "precedents"]{
            name,
            alt, 
            slug,
            image{
                asset->{
                    _id,
                    url
                }
            }
        }`)
        .then((data)=> setHouses(data))
        .catch(console.error)
    },[])

    console.log(houses)

    const [selectedHouse, setSelectedHouse] = useState({
        properties: {
            Alt: {
                rich_text: [
                    {
                    text: {
                        content: ""
                    }
                    }   
                ]
            },
            Image: {
                files: [
                    {
                       file: {
                           url: ""
                       } 
                    }
                ]
            },
            Name: {
                title: [
                    {
                        text: {
                            content: ""
                        }
                    }
                ]
            }
        }
    })


    const [ vote, setVote ] = useState({})

    const [ show, setShow ] = useState(false)


    const handleClick = (e) => {
        setSelectedHouse(e)
        showModal() 
    }

    const showModal = () => {
        setShow(true)
    }

    const hideModal = () => {
        setShow(false)
    }


    const addComment = (vote) => {
        setVote({...vote, vote})
        // saveSubmission(vote)
        console.log(vote)
    }

    console.log(vote)

    //  // get location name from URL
    // const id = useLocation()
    //  // Format
    // const formattedUrl = id.pathname.slice(10, -12)

    // const saveSubmission = async (vote) => {
    //     const user_id = uuid()
    //     const submission = {
    //         user_id: user_id,
    //         house_id: selectedHouse.id,
    //         location: formattedUrl,
    //         comment: vote.comment
    //     }
    //     console.log("Submission:", submission)
    //     console.log("Submission", vote.comment)
    //     axios.post(`${server}/api/rhs/house_votes/add`, submission)
        
    // }

    if(!houses) return <div>loading...</div>
    return (
        <div className="container">
            <PageHeader info={pageInfo}/>
            <HouseVote show={show} handleClose={hideModal} vote={vote} house={selectedHouse} setVote={() => setVote()} onAdd={addComment}>
                <p>House Vote</p>
            </HouseVote>
           
            
            <div className="image-grid">
                <div className="image" style={{background: "red", width: "400px"}}>
                    {/* <Instructions instructions={instructions}/> */}
                    <h1>Instructions</h1>
                    <p>
                        Click on a house to select your favourite house type. 
                    </p>
                </div>
                {houses.map((house, index) => (
                    <div className="image" key={index} onClick={() => handleClick(house)}>
                        <img src={house.properties.Image.files[0].file.url} alt={house.properties.Alt.rich_text[0].plain_text} />
                        <h4>{house.properties.Name.title[0].plain_text}</h4>
                        <p>{house.properties.Alt.rich_text[0].plain_text}</p>
                    </div>
                ))}
            
            </div>
        </div>
    )
}

export default HouseTypes
