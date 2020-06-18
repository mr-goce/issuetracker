import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext'

function Signup(props) {
    const authContext = useContext(AuthContext)
    const { signup, error, isAuthenticated } = authContext;
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''


    })

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
    }, [isAuthenticated, props.history]);

    const { name, email, password } = user;

     

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })

    }
  
    const onSubmit = (e) => {
        e.preventDefault();
        signup({
            name,
            email,
            password
        })
    }
    return (
        <div>
            {/* <h1> Sign Up Here: </h1> */}
            <h1>{error? "Error" : "Sign up Here:"}</h1> 
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name</label>
                    <input type='text' name="name" value={name} onChange={onChange}></input>
                </div>
                <div>
                    <label>Email</label>
                    <input type='text' name="email" value={email} onChange={onChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' name="password" value={password} onChange={onChange}></input>
                </div>
                <input type='submit' value='Sign Up'></input>
            </form>
        </div>
    )
}

export default Signup
