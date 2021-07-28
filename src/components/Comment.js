import React from 'react'

export default function Comment() {
    return (
       <div id="comment" className="comment">
           <p>Add Comment</p>
           <form action="">
               <input type="text" label="Comment" type="text" maxLength="300" placeholder="Comment:"/>
               <button type="submit" id="submit-comment">Submit Comment</button>
           </form>
       </div> 
    )
}
