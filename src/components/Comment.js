import React from 'react'
import { useState } from 'react'

const Comment = ({onAdd, marker, setShowInstructions}) => {

    const [comment, setComment] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        onAdd({ ...marker, comment:comment })
        setComment('')
        setSubmitted(true)
        setShowInstructions(false)
    }

    const handleSubmit = () => {
        
        setSubmitted(false)
    }


    const [ submitted, setSubmitted] = useState(false)


    const Form = (props) => {
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
