import React from 'react'
import { BiUndo } from 'react-icons/bi'
import {Link} from 'react-router-dom'

const PageHeader = ({info}) => {

    const {title, body} = info
    return (
        <div className="page-header">
            <div className="page-header-title">
           <h1 className="page-header-title">{title}</h1><p className="page-header-body">{body}</p>
           </div>
           <div>
               <Link to="/">
                 <BiUndo id="BIUndo" label="Back" style={{height: '3em', width: '3em', cursor: 'pointer'}}/>
                </Link>
            </div>
        </div>
    )
}

export default PageHeader
