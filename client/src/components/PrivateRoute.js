import React ,{useContext} from 'react';
import AuthContext from '../context/auth/authContext'
import {Route, Redirect} from 'react-router-dom'


function PrivateRoute({component: Component, ...rest}) {
    const authContext = useContext(AuthContext);
    const {isAuthenticated}= authContext;

    return (
        <div>
            <Route {...rest }render={props=>!isAuthenticated ? (<Redirect to= '/login'/>): (<Component {...props}/>)}/>
        </div>
    )
}

export default PrivateRoute
