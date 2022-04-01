import React, {useState} from 'react'

const HouseVoteCommentDisplay = ({comments}) => {

    const [show, setShow] = useState()


    const toggleShow = () => {
        setShow(!show)
    }
    console.log(comments)
  return (
    <div>
        <button onClick={toggleShow}>{show ? <h2>Hide Comments</h2> : <h2>Show Comments</h2>}</button>
        <div>
            {show ? <div>
                {comments.length > 0 ? <h4>Comments</h4> : <h4>No Comments Yet</h4>}
                <div>
                    {
                        comments && comments.map((comment, index)=> (
                            <p key={index}>"{comment}"</p>
                        ))
                    }
                </div>
            </div> : <div></div>}
        </div>
    </div>
  )
}

export default HouseVoteCommentDisplay