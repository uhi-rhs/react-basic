import React, {useState, useContext} from 'react'
import PageHeader from './PageHeader'
import uuid from 'react-uuid'
import axios from 'axios'
import {serverContext} from '../App'
import { useLocation } from 'react-router-dom'
import Instructions from './Instructions'


const BasicComment = (props) => {

    const id = useLocation()
    const formattedUrl = id.pathname.slice(10, -15)
    console.log(formattedUrl)

    const [pageInfo] = useState({
        title: `Comment on ${formattedUrl} project`,
        body: "This feature allows you to comment on a project"
    })

    const [ instructions ] = useState({
        header: "How to Play",
        item1: "Type a comment into the form and submit!",
        item2: "Add a comment to say what you think about this site",
        body:  "What do you think are the good and bad aspects of the site? Where do you think is the best place for housing on the site, and why? Would you want to live here? Why / why not?"
    })


        const [localLocation] = useState(() => {
        const saved = localStorage.getItem('location');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    })

    console.log(props)

    const [comment, setComment] = useState('')
    const [ submitted, setSubmitted] = useState(false)

    const server = useContext(serverContext)

    
    // const imageUrl = props.location.properties.mainImage.files[0].file.url 
    
    // console.log(props.location.properties.mainImage.files[0].file.url)
    // const [ errors, setErrors ] = useState([])
    // const getImage = () => {
    //     let imageUrl = ""
    //     if(props.location === {}){
    //          imageUrl = localLocation.properties.mainImage.files[0].file.url
    //     } else {
    //          imageUrl = props.location.properties.mainImage.files[0].file.url
    //     }
    //     return imageUrl
    // }

    const getImage = () => {
        let imageUrl = ""
        try {
            imageUrl = props.location.properties.mainImage.files[0].file.url
        }
        catch(err){
            imageUrl = localLocation.properties.mainImage.files[0].file.url
        }
        return imageUrl
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        addComment({comment:comment })
    }

    const addComment = (comment) => {
        saveSubmission(comment)
    }

    const saveSubmission = async (comment) => {
        const user_id = uuid()
        const submission = {
            comment: comment,
            dateTime: "2021-10-14",
            publish: false,
            user_id: user_id,
            projectName: formattedUrl
        }
        axios.post(`${server}/api/rhs/basic_comments/add`, submission)
        .catch((err) => {
            console.log(err)
        })
        setSubmitted(true)
        console.log(submission)
    }

    const Form = (props) => {
        return <input type="submit" value='Submit' className='btn btn-block'/>
    }

    const Feedback = (props) => {    
        return <p>Thank you. Your submission has been received.</p>
    }

    const Display = (props) => {
        const submitted = props.submitted        
        if(submitted){
            return <Feedback />
        }
        return <Form />
    }
    
    console.log(getImage())
    return (
        <div >
            <PageHeader info={pageInfo}/>
            <Instructions instructions={instructions}/>
            <div className='basic-comment' style={{backgroundImage: `url(${getImage()})`}}>
           
            <form className='add-form' onSubmit={onSubmit}>
            
            <div className='form-control'>
                <h2>Write Comment:</h2>
                <label htmlFor="Comment"></label>
                <textarea name="text" rows="8" cols="40" wrap="soft" placeholder='Type here...' value={comment} onChange={(e) => setComment(e.target.value)}> </textarea>
            </div>
            <Display submitted={submitted} />
            </form>
            </div>
        </div>
    )
}

export default BasicComment
