import React, { useState }  from 'react'
import '../modal.css'
import {GrClose} from 'react-icons/gr'
import sanityClient from "../writeClient"

const HouseVote = ({handleClose, show, selectedHouse}) => {

   
    const [rhsUser] = useState(()=> {
        const saved = localStorage.getItem('_id');
        const initialValue = JSON.parse(saved);
        return initialValue || ""
      })

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [ submitted, setSubmitted] = useState(false)
    const [comment, setComment] = useState('')
    console.log(comment)
    console.log(selectedHouse._id)
    console.log(rhsUser._id)
    console.log(rhsUser.project._ref)

    // Form Logic
    const saveSubmission = async (vote) => {
        const submission = {
            _type: 'houseVote',
            precedent: {
                _type: 'reference',
                _ref: selectedHouse._id
            },
            author: {
                _type: 'reference',
                _ref: rhsUser._id
            },
            project: {
                _type: 'reference',
                _ref: rhsUser.project._ref
                },
            comment: comment,
            submittedAt: new Date().toISOString()
        }
        sanityClient.create(submission)
        console.log("Submission:", submission)
    }
    const onSubmit = (e, house) => {
        e.preventDefault()
        if(!comment){
            alert('Please add a comment')
            return
        }
        saveSubmission()
        setComment('')
        setSubmitted(true)
    }
    

    // UI Components
    const Form = () => {
        return <input type="submit" value='Submit' className='btn btn-block'/>
    }

    const Feedback = () => {    
        return <p>Thank you. Your submission has been received.</p>
    }

    const Display = (props) => {
        const submitted = props.submitted        
        if(submitted){
            return <Feedback />
        }
        return <Form />
    }

    if(!selectedHouse) return null
    return (
     <div className={showHideClassName}>
         <div className="modal-main">
             <div className="modal-info">
             <h2>You chose: {selectedHouse.name}</h2>
             <p>( {selectedHouse.alt} )</p>
             <img src={selectedHouse.image.asset.url} alt={selectedHouse.alt} />
             </div>
             <div className="modal-form">
             <form onSubmit={onSubmit}>
                 <h4>Add a comment:</h4>
                 <div>
                     <textarea name="text" cols="40" rows="8" wrap="soft" placeholder="Type here..." value={comment} onChange={(e) => setComment(e.target.value)} className="modal-textarea"></textarea>
                 </div>
                 {/* <input type="submit" value='Submit' className='btn btn-block'/> */}
                 <Display submitted={submitted} />
             </form>
            

            
            </div>
       
            <GrClose className="modal-close" onClick={handleClose} style={{height: '3em', width: '3em'}}/>
         </div>
       
     </div>
    )
}

export default HouseVote
