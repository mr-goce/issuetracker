import {
    SIGNUP_FAIL, LOGOUT, LOGGIN_FAIL, LOGGIN_SUCCESS, AUTH_ERROR, SIGNUP_SUCCESS, USER_LOADED
}
    from '../types/types'

export default (state, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
        case LOGGIN_SUCCESS:    
            localStorage.setItem('token', action.payload.token)
            return {
                ...state, ...action.payload, isAuthenticated: true, loading: false
            }
        case SIGNUP_FAIL:
        case AUTH_ERROR:
        case LOGGIN_FAIL:
        case LOGOUT:        
            localStorage.removeItem('token')
            return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: action.payload }

        case USER_LOADED:
            return {
                ...state, isAuthenticated: true, loading: false, user: action.payload}
      
                
        default:
            return state
    }
}