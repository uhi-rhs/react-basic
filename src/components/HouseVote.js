import React, { useState }  from 'react'

const HouseVote = () => {


    const [comment, setComment] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        if(!vote){
            alert('Please add a comment')
            return
        }
        onAdd({vote:vote })
        setComment('')
    }

    return (
     <></>
    )
}

export default HouseVote
