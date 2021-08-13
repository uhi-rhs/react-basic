import React from 'react'
import Spinner from './Spinner'

const DBNav = ({dbs, isLoading}) => {

    // console.log(dbs)

   return isLoading? (
       <Spinner />
   ) :  (
        <div className="dbs-container">
            <h4>List of Available Databases from Notion</h4>
            {/* {console.log(dbs.results)} */}
            {dbs.results.map((db) => (
                <div key={db.id}>
                    <p>{db.title[0].text.content}</p>
                </div>
            ))}
        </div>
    )
}

export default DBNav
