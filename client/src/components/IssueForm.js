import React, { useState, useContext, useEffect } from 'react'
import IssueContext from '../context/issue/issueContext'


function IssueForm() {
    const issueContext = useContext(IssueContext)
    const { temporary, editIssue } = issueContext
    useEffect(() => {
        if (temporary != null) {
            setIssue(temporary);
        } else {
            setIssue({
                name: '',
                description: '',
                status: 'In Progress',
                type: 'Bug'
            });

        }
    }, [issueContext, temporary])
    const [issue, setIssue] = useState({
        name: '',
        description: '',
        status: 'In Progress',
        type: 'Bug'

    })
    const onChange = (e) => {
        setIssue({
            ...issue, [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (temporary === null) {

            issueContext.addIssue(issue);
            setIssue({
                name: '',
                description: '',
                status: '',
                type: ''
            })
        } else {
            editIssue(issue);
           
           
        }

    }
    const { name, description, type, status } = issue;
    return (
        <form onSubmit={onSubmit}>
            <h2>{temporary ? "EDIT ISSUE" : "ADD ISSUE"}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="text" placeholder="Description" name="description" value={description} onChange={onChange} />
            <h5>Issue Type:</h5>
            <input type="radio" name="type" value="Bug" checked={type === "Bug"} onChange={onChange} /> Bug
            <input type="radio" name="type" value="Task" checked={type === "Task"} onChange={onChange} /> Task
           
           
                <h5>Issue Status:</h5>
                <input type="radio" name="status" value="Open" checked={status === "Open"} onChange={onChange} /> Open

                <input type="radio" name="status" value="InProgress" checked={status === "InProgress"} onChange={onChange} /> In Progess

                <input type="radio" name="status" value="Implemented" checked={status === "Implemented"} onChange={onChange} /> Implemented
               
            <input type="submit" value={temporary ? "Save" : "Add Issue"} />
        </form>




    )
}

export default IssueForm
