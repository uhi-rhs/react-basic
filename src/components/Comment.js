import React from 'react'
import { useState } from 'react'

const Comment = ({onAdd, marker}) => {

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
    }

    const [ submitted, setSubmitted] = useState(false)


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

    return (
        <div className='comment'>
            <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <h2>Add Comment</h2>
                <label htmlFor="Comment"></label>
                {/* <input type="text" placeholder='Type here...' value={comment} onChange={(e) => setComment(e.target.value)}/> */}

                <textarea name="text" rows="8" cols="40" wrap="soft" placeholder='Type here...' value={comment} onChange={(e) => setComment(e.target.value)}> </textarea>

            </div>
            {/* <input type="submit" value='Submit' className='btn btn-block'/> */}
            <Display submitted={submitted} />

        </form>
        </div>
    )
}

export default Comment
