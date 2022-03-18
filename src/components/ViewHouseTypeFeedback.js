import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader'
import sanityClient from "../readClient"
import {FaStar} from 'react-icons/fa'


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

    const [houseTypeCount, setHouseTypeCount] = useState()
    // const [ votes, setVotes] = useState([])

    console.log(houseTypeCount)

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

console.log(houses)
console.log(votes)

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


    // useEffect(() => {
    //     const fetchItems = async () => {
    //         const result = await axios(`${server}/api/rhs/house_votes`)
    //         const filteredData = result.data.filter(data => data.properties.location.rich_text[0].plain_text === formattedUrl)
    //         countItems(filteredData)
    //         // setVotes(filteredData)
    //     }
    //     fetchItems()
    //     setIsLoading(false)
    // }, [server, formattedUrl])




    const houseCount = (house) => {
        const key = house.id
        return houseTypeCount[key]
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

                                {
                                    houseCount(house) > 0 ? 
                                    Array.from(Array(houseCount(house)).map((x, index) => <FaStar key={index} id="star" label="Star" style={{height: '2em', width: '2em', color: "yellow"}}/>))
                                    : <div style={{height: '2em', width: '2em'}}></div>
                                }
                            </span>
                        </div>
                        <h4>{house.name}</h4>
                        <p>{house.alt}</p>
                        {/* <small>{dotDisplay(house)}</small>   */}     
                    </div>
                ))}
            
            </div>
        </div>
    )
}

export default ViewHouseTypeFeedback
