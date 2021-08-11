import React, {useState, useEffect} from 'react'
import axios from 'axios';

const ViewPIComments = () => {

    const [ comments, setComments ] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`http://localhost:5000/api/rhs/braemar_postits`)
            console.log(result)
            setComments(result.data)
        }
        fetchItems()
        console.log("use effect")
    }, [])

    return (
        <div>
            <h1>Feedback</h1>
            <div className="postit-container">
                
                {console.log(comments)}
                {comments.map((comment) => (
                    <div 
                    key={comment.properties.user_id.title[0].text.content}
                    className="postit"
                    >
                    {comment.properties.comment.rich_text[0].text.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewPIComments
