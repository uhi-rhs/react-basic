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
            <input type="submit" value='Submit' className='btn btn-block'/>
        </form>
        </div>
    )
}

export default Comment
