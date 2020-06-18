import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext'


function Navbar() {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, user, logout } = authContext;

    const onLogout =()=>{
        logout()
    }
    const authUser = (
        <Fragment>
            <li> Hello {user && user.name}</li>
            <li onClick={onLogout}>logout </li>
        </Fragment>

    )
    const guestUser = (
        <Fragment>
            <li> <Link to="/signup">Sign Up</Link></li>
            <li> <Link to="/login">LogIn</Link></li>
        </Fragment>
    )


    return (
        <div className='navclass' >
            <div className='container'>
                <div className='navFlex'>

                    <h1>ISSUE TRACKER </h1>
                    <ul >
                    {isAuthenticated? authUser: guestUser}
                        {/* <li>
                    <Link to="/register">REGISTER</Link></li>
                <li>
                    <Link to="/login">LOGIN</Link></li> */}
                    </ul>
                </div>


            </div>
        </div>
    )
}


export default Navbar
