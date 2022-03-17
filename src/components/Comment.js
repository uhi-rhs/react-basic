import React from 'react'
import { useState } from 'react'
import sanityClient from '../writeClient.js'


const Comment = ({marker, setPopup, project, rhsUser, setMarker, setShowInstructions}) => {

    const [comment, setComment] = useState('')


        // comment submit functions
        const saveSubmission = async (marker) => {
            const submission = {
                _type: 'siteComment',
                lat: marker.latitude,
                lng: marker.longitude,
                comment: marker.comment,
                location: project.location,
                submittedAt: new Date().toISOString(),
                published: false,
                author: {
                    _type: 'reference',
                    _ref: rhsUser._id
                },
                project: {
                    _type: 'reference',
                    _ref: rhsUser.project._ref
                }
            }
            sanityClient.create(submission)
            // const headers = {
            //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //     withCredentials: false,
            // }
            // axios.post(`${server}/api/rhs/${formattedUrl}/site_comment/add`, submission)
            // await axios.post(`${server}/api/rhs/site_comments/add`, submission,{headers})
            // console.log("Submission:", submission)
        }

    const addComment = (marker) => {
        setMarker({...marker, marker})
        saveSubmission(marker)
        setPopup(true)
    }

    

    const onSubmit = (e) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        addComment({ ...marker, comment:comment })
        setComment('')
        setSubmitted(true)
        setShowInstructions(false)
    }



    // submit functions
    const handleSubmit = () => {
        setSubmitted(false)
        setMarker({
            latitude: project.lat,
            longitude: project.lng,
            comment: '',
            visible: false
        })
        setPopup(false)
    }

    const [ submitted, setSubmitted] = useState(false)

    // Form & Feedback components
    const Form = () => {
        return <input type="submit" value='Submit' className='btn btn-block'/>
    }

    const Feedback = () => {    
        return <div className='comment'>
            <div className='form-control'>
                <h2>Thank You</h2>
                <label htmlFor="Feedback"></label>
                <h4>Your submission has been received.</h4>
                <button onClick={handleSubmit} className='btn btn-block'>Click to make another comment</button>
            </div>
        </div>
        
    }

    console.log(submitted)
    return !submitted ? (
        <div className='comment'>
            <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <h2>Add Comment</h2>
                <label htmlFor="Comment"></label>
                <textarea name="text" rows="10" cols="40" wrap="soft" placeholder='Type here...' value={comment} onChange={(e) => setComment(e.target.value)}> </textarea>
            </div>
            <Form />
        </form>
        </div>
    ) : <Feedback/>
}

export default Comment
