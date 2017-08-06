import React from 'react';
import Login from './Login.js';
import { browserHistory } from 'react-router';

const utils = require('./../../utils/utils.js')

class Auth extends React.Component{
  getInitialState() {
    return {
      ifLoggedIn: undefined
    }
  }
  // componentDidMount() {
  //   console.log(this.state)
  // },

  render(){
    return(
      <div className="container" id="login-container">
        <Login />
      </div>
    )
  }

}

export default Auth
