import React, {useState} from 'react'
import PageHeader from './PageHeader'
import CommentForm from './CommentForm'

const ProjectComment = () => {

    const [pageInfo] = useState({
        title: "General Comment on Braemar",
        body: "What do you want to tell us about this site?"
    })

    const addComment = (comment) => {
        console.log(comment)
    }

    return (
        <div className="container">
             <PageHeader info={pageInfo}/>
            <div className="project-comment">
                <CommentForm onAddComment={addComment}/>
            </div>
        </div>
    )
}

export default ProjectComment
