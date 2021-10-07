import React, {useState} from 'react'
import PageHeader from './PageHeader'
import uuid from 'react-uuid'
import axios from 'axios'


const BasicComment = (props) => {

    const [pageInfo] = useState({
        title: `Comment on ${props.location.properties.Name.title[0].plain_text} project`,
        body: "This feature allows you to comment on a project"
    })

    const [comment, setComment] = useState('')

    const [ errors, setErrors ] = useState([])

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
        setComment('')
    }

    const addComment = (comment) => {
        saveSubmission(comment)
    }

    const saveSubmission = async (comment) => {
        const user_id = uuid()
        const submission = {
            comment: comment,
            dateTime: "2021-10-01",
            publish: false,
            user_id: user_id,
            projectName: props.location.properties.Name.title[0].plain_text
        }
        axios.post(`${process.env.REACT_APP_API_URL}/api/rhs/basic_comments/add`, submission)
        .catch((err) => {
            console.log(err)
        })
        console.log(submission)
    }
    
    console.log(errors)
    return (
        <div >
            <PageHeader info={pageInfo}/>
            <div className='basic-comment'>
            <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <h2>Write Comment:</h2>
                <label htmlFor="Comment"></label>
                {/* <input type="text" placeholder='Type here...' value={comment} onChange={(e) => setComment(e.target.value)}/> */}

                <textarea name="text" rows="8" cols="40" wrap="soft" placeholder='Type here...' value={comment} onChange={(e) => setComment(e.target.value)}> </textarea>

            </div>
            <input type="submit" value='Submit' className='btn btn-block'/>
        </form>
        
            </div>
        </div>
    )
}

export default BasicComment
