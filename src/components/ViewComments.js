import React, {useState, useEffect} from 'react'
import PageHeader from './PageHeader';
import sanityClient from "../readClient"

const ViewComments = () => {

    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })
    
    const [ comments, setComments ] = useState([])

    const [pageInfo] = useState({
        title: "Comments on the site",
        body: "Showing ongoing feedback from the consultation"
    })


    console.log(rhsUser)

    useEffect(()=> {
        sanityClient
        .fetch(`*[_type == "simpleComment" && project._ref == "${rhsUser.project._ref}"]{
            comment, 
            userId,
            project,
            category->{
                title
            },
        }`)

    .then((data) => setComments(data))
    .catch(console.error)
    },[rhsUser.project._ref])

    console.log(comments)
    if(!comments) return <div>Loading...</div>
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
                   {
                       comment.category ? <small className="category">Category:  {comment.category.title ? comment.category.title : ""}</small> : null
                   }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewComments
