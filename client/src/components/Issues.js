import React , {useContext, useEffect} from 'react';
import IssueContext from '../context/issue/issueContext';
import IsssueItem from './IssueItem'
import IssueItem from './IssueItem';

function Issues() {
    const issueContext = useContext(IssueContext);
    const {issues, getIssues} = issueContext
    useEffect(()=>{
        getIssues()
    },[])
    return (
        <div>
            
            <h4>total: {issues.length} issues</h4>
            {issues.map (issue =>(
                <IssueItem issue = {issue}/>
            ))}
        </div>
    )
}

export default Issues
