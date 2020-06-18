import React, { useReducer } from 'react';
import IssueContext from './issueContext';
import issueReducer from './issueReducer'
import axios from 'axios'
import {
    ADD_ISSUE,
    DELETE_ISSUE,
    GET_ALL_NI_ISSUES,
    UPDATE_ISSUE,
    SET_TEMPORARY,
    ISSUE_ERROR,
    GET_ISSUES
} from '../types/types'
import issueContext from './issueContext';
// import Issue from '../../../../models/Issue';

const IssueState = props => {
    const initialState = {
        issues: [],
        temporary: null,
        error: null

    };
    const [state, dispatch] = useReducer(issueReducer, initialState);
    // ADD ISSUE
    const addIssue = async (issue) => {
        // issue.id = 4;
        const config = {
            headers: {
                "Contact-Type": "application/json"
            }
        }
        try {
            const res = await axios.post('/api/issues', issue, config)
            dispatch({ type: ADD_ISSUE, payload: res.data })
            // console.log(res.data)
        } catch (error) {
            dispatch({ type: ISSUE_ERROR, payload: error.response })
        }
    }

    // GET ISSUES
    const getIssues = async () => {

        try {
            const res = await axios.get('/api/issues')
            dispatch({ type: GET_ISSUES, payload: res.data })
           
        } catch (error) {
            dispatch({ type: ISSUE_ERROR, payload: error.response })
        }
    }
    // DELETE ISSEUE
    const deleteIssue = async (id) => {
        try {
             await axios.delete(`/api/issues/${id}`)
              dispatch({ type: DELETE_ISSUE, payload: id })
            
            // console.log(res.data)
        } catch (error) {
            dispatch({ type: ISSUE_ERROR, payload: error.response })
        }
    }


    // UPDATE ISSUE
    const editIssue =async (issue) => {
        const config = {
            headers: {
                "Contact-Type": "application/json"
            }
        }
        try {
            const res = await axios.put(`/api/issues/${issue._id}`, issue, config)
            dispatch({ type: UPDATE_ISSUE, payload: issue })
            // console.log(res.data)
        } catch (error) {
            dispatch({ type: ISSUE_ERROR, payload: error.response })
        }
        
    }
    // SET TEMPORARY
    const setTemporary = (issue) => {
        dispatch({ type: SET_TEMPORARY, payload: issue })
    }


    return (
        <IssueContext.Provider value={{ issues: state.issues, temporary: state.temporary, error: state.error, getIssues,addIssue, deleteIssue, setTemporary, editIssue }}>
            {props.children}
        </IssueContext.Provider>
    )
}
export default IssueState