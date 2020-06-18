import {
    ADD_ISSUE,
    DELETE_ISSUE,
    GET_ALL_NI_ISSUES,
    UPDATE_ISSUE,
    SET_TEMPORARY,
    ISSUE_ERROR,
    GET_ISSUES
} from '../types/types';

export default (state, action)=>{
 switch(action.type){
    case ADD_ISSUE:
        return{ ...state, issues: [...state.issues, action.payload] }
    case DELETE_ISSUE:
        return{ ...state, issues: state.issues.filter(issue=> issue._id !==action.payload)}    
    case SET_TEMPORARY:
        return{...state, temporary:action.payload}    
    case UPDATE_ISSUE:
        return{ ...state, issues: state.issues.map(issue => issue._id === action.payload._id ? action.payload:issue)}
    case ISSUE_ERROR:
        return{...state, error: action.payload}  
    case GET_ISSUES:
        return{ ...state, issues:action.payload}      
    
    default:
        return state
 }
}



