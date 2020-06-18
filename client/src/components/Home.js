import React, { useContext, useEffect } from 'react';
import Issues from './Issues'
import IssueForm from './IssueForm';
import AuthContext from '../context/auth/authContext'

function Home() {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser()
    }, [])
    return (
        <div className='homeView'>
            <div>
                <IssueForm />
            </div>
            <div>
                <Issues />
            </div>
        </div>
    )
}

export default Home
