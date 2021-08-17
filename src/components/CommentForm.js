import React, {useState} from 'react'

const CommentForm = ({onAddComment}) => {


    const [comment, setComment] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        onAddComment({comment:comment })
        setComment('')
    }

    console.log(comment)

    return (
        <div className="comment-form-container">
            <form className='comment-form' onSubmit={onSubmit}>
            <div className='form-control'>  
                <label htmlFor="">Add a comment</label>
                <textarea id="textarea" type="text" rows="4" placeholder='Add Comment' cols="34" name="text" wrap="hard" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <input type="submit" value='Submit' className='btn btn-block'/>
            </form>
        </div>
    )
}

export default CommentForm
