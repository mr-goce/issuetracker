import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/auth/authContext'

function Login(props) {
    const authContext = useContext(AuthContext);
    const { login, error, isAuthenticated } = authContext;

    const [user, setUser] = useState({
       
        email: '',
        password: ''
    })

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
    }, [isAuthenticated, props.history]);

    const {  email, password } = user;
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })

    }
    const onSubmit = (e)=>{
        e.preventDefault();
       login({
           email,
           password
       })  
    }
    return (
        <div>
            <h1> Log In here: </h1>
            <form onSubmit= {onSubmit}>
               
                <div>
                    <label>Email</label>
                    <input type='text' name="email" value={email} onChange={onChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name="password" value={password} onChange={onChange}></input>
                </div>
                <input type='submit' value='LOG IN'></input>
            </form>
        </div>
    )
}

export default Login
