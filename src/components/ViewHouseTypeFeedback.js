import React, {useState, useEffect, useContext} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import PageHeader from './PageHeader'
import {serverContext} from '../App'
import Spinner from './Spinner'
import { FaStar } from 'react-icons/fa'

const ViewHouseTypeFeedback = (props) => {

    const [pageInfo] = useState({
        title: "Feedback on House Types",
        body: "Number of stars = number of votes for that building type"
    })

    const server = useContext(serverContext)
    const [isLoading, setIsLoading] = useState(true)
    const id = useLocation()
    const formattedUrl = id.pathname.slice(10, -12)


    const [ houses, setHouses ] = useState([])
    const [houseTypeCount, setHouseTypeCount] = useState()
    // const [ votes, setVotes] = useState([])

    console.log(houseTypeCount)

    const countItems = (arr) => {
        let count = {}
        for(let i = 0; i < arr.length; i++){
            if(count[arr[i].properties.house_id.rich_text[0].plain_text]){
                count[arr[i].properties.house_id.rich_text[0].plain_text] +=1
            }else{
                count[arr[i].properties.house_id.rich_text[0].plain_text] = 1
            }
        }
        setHouseTypeCount(count)
    }

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${server}/api/rhs/precedents`)
            setHouses(result.data)
        }
        fetchItems()
        
    }, [server])

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${server}/api/rhs/house_votes`)
            const filteredData = result.data.filter(data => data.properties.location.rich_text[0].plain_text === formattedUrl)
            countItems(filteredData)
            // setVotes(filteredData)
        }
        fetchItems()
        setIsLoading(false)
    }, [server, formattedUrl])

    // const dotDisplay = (house) => {
    //     const key = house.id
    //     return <h1>{houseTypeCount[key]}</h1>
    // }

    const houseCount = (house) => {
        const key = house.id
        return houseTypeCount[key]
    }

    return isLoading? ( <Spinner />
        ) : (
        <div className="container">
            <PageHeader info={pageInfo}/>
            <div className="image-grid">
                {houses.map((house, index) => (
                    <div className="image" key={index} >
                        <div className="image-overlay">
                            <img src={house.properties.Image.files[0].file.url} alt={house.properties.Alt.rich_text[0].plain_text} />
                            <span className="star-display">
                                { 
                                houseCount(house) > 0 ? 
                                Array(houseCount(house)).fill(
                                <FaStar id="star" label="Star" style={{height: '2em', width: '2em', color: "yellow"}}/>
                                ) : <div style={{height: '2em', width: '2em'}}></div>
                                }

                                {/* {
                                    houseCount(house) > 0 ? 
                                    Array.from(Array(houseCount(house)).map((x, index) => <FaStar key={index} id="star" label="Star" style={{height: '2em', width: '2em', color: "yellow"}}/>))
                                    : <div style={{height: '2em', width: '2em'}}></div>
                                } */}
                            </span>
                        </div>
                        <h4>{house.properties.Name.title[0].plain_text}</h4>
                        <p>{house.properties.Alt.rich_text[0].plain_text}</p>
                        {/* <small>{dotDisplay(house)}</small>   */}     
                    </div>
                ))}
            
            </div>
        </div>
    )
}

export default ViewHouseTypeFeedback
