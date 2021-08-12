import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PageHeader from './PageHeader';

const ViewPIComments = () => {

    const [ comments, setComments ] = useState([])

    const [pageInfo] = useState({
        title: "Postit Comments",
        body: "Showing feedback on a consultation"
    })

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

export default ViewPIComments
