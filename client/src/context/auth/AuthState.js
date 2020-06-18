import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer'
import axios from 'axios';
import setToken from '../../setToken'
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGGIN_SUCCESS,
  LOGGIN_FAIL,
  LOGOUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from '../types/types';
// import authContext from './authContext';
// import Issue from '../../../../models/Issue';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated : null,
        loading : true,
        error: null,
        user: null

    };
    const [state, dispatch] = useReducer(authReducer, initialState);
    // LOAD USER
    const loadUser =async()=>{
        if(localStorage.token){
            setToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload:res.data })
            
            
        } catch (error) {
            dispatch({type: AUTH_ERROR})
        }
    }

    // sighnUP USER
    const signup =async(formData)=>{
        const config ={
            headers:{
                'Content-Type': 'Application/json'
            }
        }
        try {
            const res = await axios.post('/api/user',formData, config);
            dispatch({type:SIGNUP_SUCCESS, payload: res.data})
            loadUser()
        } catch (error) {
            dispatch({type: SIGNUP_FAIL, payload:error.response.data})
        }
    }
    // LOGIN USER
    const login =async(formData)=>{
        const config ={
            headers:{
                'Content-Type': 'Application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth',formData, config);
            dispatch({type:LOGGIN_SUCCESS, payload: res.data})
            loadUser()
        } catch (error) {
            dispatch({type: LOGGIN_FAIL, payload:error.response.data})
        }
    }
    // LOGOUT
    const logout =()=>{
        dispatch({type: LOGOUT})
    }
     


    return (
        <AuthContext.Provider value={{
            token:state.token, 
            isAuthenticated: state.isAuthenticated,
             loading: state.loading,
              error: state.error, 
              user:state.user, 
               signup,
               loadUser,
               login,
               logout}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState