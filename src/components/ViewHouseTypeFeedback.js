import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader'
import sanityClient from "../readClient"
import {FaStar} from 'react-icons/fa'
import HouseVoteCommentDisplay from './HouseVoteCommentDisplay'


const ViewHouseTypeFeedback = (props) => {

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

    const [pageInfo] = useState({
        title: "Feedback on House Types",
        body: "Number of stars = number of votes for that building type"
    })


    // Count votes for each house type and store in an array to be accessed by house id
    const [houseTypeCount, setHouseTypeCount] = useState()

    const countItems = (arr) => {
        let count = {}
        for(let i = 0; i < arr.length; i++){
            if(count[arr[i].precedent._ref]){
                count[arr[i].precedent._ref] +=1
            }else{
                count[arr[i].precedent._ref] = 1
            }
        }
        setHouseTypeCount(count)
    }


    const [ houses, setHouses ] = useState([])
    const [ votes, setVotes ] = useState([])

    useEffect(()=> {
        sanityClient
        .fetch(`*[_type == "precedent"]{
            name,
            alt, 
            slug,
            _id,
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

    useEffect(()=> {
        sanityClient
        .fetch(`*[_type == "houseVote" && project._ref == "${rhsUser.project._ref}"]{
            comment,
            precedent,
            project,
            category
        }`)
        .then((data)=> setVotes(data))
        .catch(console.error)
    },[rhsUser.project._ref])

    useEffect(()=> {
        countItems(votes)
    },[votes])

    const houseCount = (house) => {
        const key = house._id
        return houseTypeCount[key]
    }

    console.log(votes)

    const getComments = (item, arr) => {
        
        let comments = []
        // console.log(arr.length)
        for(let i = 0; i < arr.length; i++){
            // console.log(arr[i])
            if(arr[i].precedent._ref === item._id){
                comments.push(arr[i].comment)
                // console.log(arr[i].comment)
                
            }
            
        }
        return comments
    }

    if(!houses) return <div>Loading....</div>
    return (
        <div className="container">
            <PageHeader info={pageInfo}/>
            <div className="image-grid">
                {houses.map((house, index) => (
                    <div className="image" key={index} >
                        <div className="image-overlay">
                            <img src={house.image ? house.image.asset.url : "/house.png"} alt={house.name}/>
                            <span className="star-display">
                                { 
                                houseCount(house) > 0 ?
                                Array(houseCount(house)).fill(
                                <FaStar id="star" label="Star" style={{height: '2em', width: '2em', color: "yellow"}}/>
                                ) : <div style={{height: '2em', width: '2em'}}></div>
                                }
                            </span>
                        </div>
                        <h4>{house.name}</h4>
                        <p>{house.alt}</p>
                        {/* <small>{dotDisplay(house)}</small>   */}   
                        <HouseVoteCommentDisplay comments={getComments(house, votes)}/>  
                    </div>
                ))}
            
            </div>
        </div>
    )
}

export default ViewHouseTypeFeedback
