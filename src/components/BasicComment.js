import React, {useState, useContext} from 'react'
import PageHeader from './PageHeader'
import uuid from 'react-uuid'
import axios from 'axios'
import {serverContext} from '../App'


const BasicComment = (props) => {

    const [pageInfo] = useState({
        title: `Comment on ${props.location.properties.Name.title[0].plain_text} project`,
        body: "This feature allows you to comment on a project"
    })

    const [comment, setComment] = useState('')
    const [ submitted, setSubmitted] = useState(false)

    const server = useContext(serverContext)

    // const [ errors, setErrors ] = useState([])

    // const onSubmit = (e) => {
    //     console.log(e)
    // }

    const onSubmit = (e) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        addComment({comment:comment })
        // setComment('')
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
            projectName: props.location.properties.Name.title[0].plain_text
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
    
    // console.log(errors)
    return (
        <div >
            <PageHeader info={pageInfo}/>
            <div className='basic-comment' style={{backgroundImage: `url(${props.location.properties.mainImage.files[0].file.url})`}}>
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
