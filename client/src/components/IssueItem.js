import React, { useContext } from 'react';
import IssueContext from '../context/issue/issueContext'

function IssueItem({ issue }) {
    const issueContext = useContext(IssueContext)
    const{deleteIssue, setTemporary}=issueContext
    const { _id, name, description, status, type } = issue;
    const onDelete = () => {
       deleteIssue(_id);

    }
    const onEdit = () => {
        setTemporary(issue)
    }
    return (
        <div className='issueItemView'>
            <div><span>Name:</span>{name}</div>
            <div><span>Status:</span>{status}</div>
            <div><span>Description:</span>{description}</div>
            <div><span>Type:</span>{type}</div>

            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>

        </div>
    )
}

export default IssueItem
