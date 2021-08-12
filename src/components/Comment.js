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
                <label htmlFor="">Comment</label>
                <input type="text" placeholder='Add Comment' value={comment} onChange={(e) => setComment(e.target.value)}/>
            </div>
            <input type="submit" value='Submit' className='btn btn-block'/>
        </form>
        </div>
    )
}

export default Comment
