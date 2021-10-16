import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import uuid from 'react-uuid'

import PageHeader from './PageHeader'
import {serverContext} from '../App'

const HouseTypes = (props) => {

    const [ houses, setHouses ] = useState([])

    const server = useContext(serverContext)


    const [pageInfo] = useState({
        title: "Look at these housetypes",
        body: "Showing house types for feedback"
    })

    const [ vote, setVote ] = useState({})

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/precedents`)
            console.log(result)
            setHouses(result.data)
        }
        fetchItems()
    }, [])

    const handleClick = (e) => {
        setVote({
            house_id: e.id,
        })
        
    }

    console.log(vote)

    // const saveSubmission = async (vote) => {
    //     const user_id = uuid()
    //     const submission = {
    //         user_id: user_id,
    //         house_id: vote.house_id,
    //         location: props.location.properties.Name.title[0].plain_text,
    //         comment: "comment..."
    //     }
    //     axios.post(`${server}/api/rhs/${props.location.properties.Name.title[0].plain_text}/house_votes/add`, submission)
    // }

    return (
        <div className="container">
            <PageHeader info={pageInfo}/>
            
            <div className="image-grid">
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
