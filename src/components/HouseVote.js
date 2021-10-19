import React, { useState }  from 'react'
import '../modal.css'
import {GrClose} from 'react-icons/gr'

const HouseVote = ({handleClose, show, house, vote, setVote, onAdd}) => {


    const [comment, setComment] = useState('')

    const onSubmit = (e, house) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        // setVote({...vote, comment:comment})
        onAdd({...vote, comment:comment })
        console.log("OnSubmit fired", comment)
        setComment('')
    }
    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    
    return (
     <div className={showHideClassName}>
         <div className="modal-main">
             <div className="modal-info">
             <h2>You chose: {house.properties.Name.title[0].plain_text}</h2>
             <p>( {house.properties.Alt.rich_text[0].plain_text} )</p>
             <img src={house.properties.Image.files[0].file.url} alt="" />
             </div>
             <div className="modal-form">
             <form onSubmit={onSubmit}>
                 <h4>Add a comment:</h4>
                 <div>
                     <textarea name="text" cols="40" rows="8" wrap="soft" placeholder="Type here..." value={comment} onChange={(e) => setComment(e.target.value)} className="modal-textarea"></textarea>
                 </div>
                 <input type="submit" value='Submit' className='btn btn-block'/>
             </form>
            

            
            </div>
       
            <GrClose className="modal-close" onClick={handleClose} style={{height: '3em', width: '3em'}}/>
         </div>
       
     </div>
    )
}

export default HouseVote
