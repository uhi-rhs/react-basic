import React, {useState} from 'react'
import PageHeader from './PageHeader'
// import uuid from 'react-uuid'
// import axios from 'axios'
// import {serverContext} from '../App'
// import { useLocation } from 'react-router-dom'
import Instructions from './Instructions'
import sanityClient from '../writeClient.js'


const BasicComment = () => {

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

    const [pageInfo] = useState({
        title: `Comment on project`,
        body: "This feature allows you to comment on a project"
    })

    const [ instructions ] = useState({
        header: "How to Play",
        item1: "Add a comment to say what you think about this site",
        body:  "What do you think are the good and bad aspects of the site? Where do you think is the best place for housing on the site, and why? Would you want to live here? Why / why not?"
    })

    console.log(rhsUser)
    const [comment, setComment] = useState('')
    const [ submitted, setSubmitted] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        addComment({comment })
    }

    const addComment = (comment) => {
        saveSubmission(comment)
    }

    console.log(comment)

    const saveSubmission = async (comment) => {
        // const user_id = uuid()
        const submission = {
            _type: 'simpleComment',
            comment: comment.comment,
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
        // axios.post(`${server}/api/rhs/basic_comments/add`, submission)
        // .catch((err) => {
        //     console.log(err)
        // })
        sanityClient.create(submission)
        setComment('')
        setSubmitted(true)
        console.log(submission)
    }

    const handleSubmit = () => {
        setSubmitted(false)
    }


    const Form = () => {
        return <input type="submit" value='Submit' className='btn btn-block'/>
    }

    const Feedback = () => {    
        return  <div className='comment'><div className='form-control'>
        <h2>Thank you</h2>
        <label htmlFor="Feedback"></label>
        <h4>Your comment has been submitted</h4>
        <button onClick={handleSubmit} className='btn btn-block'>Click to make another comment</button>
    </div>
    </div>
    }
    

    return (
        <div >
            <PageHeader info={pageInfo}/>
           
            <div className='basic-comment' style={{backgroundImage: `url(${"/map-with-comments.jpg"})`}}>
            <div className="basic-instructions">
                {
                    !submitted? <Instructions instructions={instructions}/> : null
                }
            
            </div>

            {
                !submitted ?  <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <h2>Write Comment:</h2>
                    <label htmlFor="Comment"></label>
                    <textarea name="text" rows="8" cols="40" wrap="soft" placeholder='Type here...' value={comment} onChange={(e) => setComment(e.target.value)}> </textarea>
                </div>
                <Form />
                </form>
                :
                <Feedback/>
            }
           

            </div>
        </div>
    )
}

export default BasicComment
