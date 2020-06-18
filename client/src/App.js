import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import IssueState from './context/issue/IssueState';
import AuthState from './context/auth/AuthState';
import Signup from './components/Signup';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute'

import setToken from './setToken'
if(localStorage.token){
  setToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <IssueState>
        <Router>
          <div className="App">
            <Navbar />
            <div className='container'>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/signup' component ={Signup}/>
                <Route exact path='/login' component ={Login}/>              

              </Switch>
            </div>
          </div>
        </Router>
      </IssueState>
     </AuthState> 
  );
}

export default App;
