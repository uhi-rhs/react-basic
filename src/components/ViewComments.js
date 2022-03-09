import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader';
import sanityClient from "../readClient"

const ViewComments = ({user}) => {
    
    const [ comments, setComments ] = useState([])

    const [pageInfo] = useState({
        title: "Comments on the site",
        body: "Showing ongoing feedback from the consultation"
    })


    console.log(user)

    useEffect(()=> {
        sanityClient
        .fetch(`*[_type == "simpleComment" && project._ref == "${user.project._ref}"]{
            comment, 
            userId,
            project,
            category->{
                title
            },
        }`)

    .then((data) => setComments(data))
    .catch(console.error)
    },[user.project._ref])

    console.log(comments)

    return (
        <div className="postit-page" 
        >
             <PageHeader info={pageInfo}/>
            
             <div className="postit-container" >     
           
                {console.log(comments)}
                {comments.map((comment, index) => (
                    <div 
                    key={index}
                    className="postit"
                    >
                   <p> {comment.comment}</p>
                   <small>Category:  {comment.category.title ? comment.category.title : ""}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewComments
