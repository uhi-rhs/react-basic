import React, {useState} from 'react'
import PageHeader from './PageHeader'

const BasicComment = (props) => {

    const [pageInfo] = useState({
        title: `Comment on ${props.location.properties.Name.title[0].plain_text} project`,
        body: "This feature allows you to comment on a project"
    })

    const [comment, setComment] = useState('')

    const onSubmit = (e) => {
        console.log(e)
    }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     if(!comment){
    //         alert('Please add a comment')
    //         return
    //     }
    //     addComment({ ...marker, comment:comment })
    //     setComment('')
    // }

    // const addComment = (marker) => {
    //     setMarker({...marker, marker})
    //     saveSubmission(marker)
    //     setPopup(true)
    // }

    // const saveSubmission = async (marker) => {
    //     const user_id = uuid()
    //     const submission = {
    //         lat: marker.latitude,
    //         lng: marker.longitude,
    //         comment: marker.comment,
    //         dateTime: "2021-10-01",
    //         publish: false,
    //         user_id: user_id
    //     }
    //     axios.post(`${process.env.REACT_APP_API_URL}/api/rhs/add`, submission)
    // }
    
    return (
        <div >
            <PageHeader info={pageInfo}/>
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
        </div>
    )
}

export default BasicComment
