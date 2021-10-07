import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PageHeader from './PageHeader';

const ViewComments = () => {
    
    const [ comments, setComments ] = useState([])

    const [pageInfo] = useState({
        title: "Comments",
        body: "Showing feedback on consultation"
    })

    useEffect(() => {
        const fetchItems = async () => {
            const result = await axios(`${process.env.REACT_APP_API_URL}/api/rhs/basic_comments`)
            console.log(result)
            setComments(result.data)
        }
        fetchItems()
    }, [])

    // To do: filter data to return only comments for a specific location / project (from props)

    return (
        <div className="postit-page">
             <PageHeader info={pageInfo}/>
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

export default ViewComments
