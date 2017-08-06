import React from 'react';
// import NotificationSystem from 'react-notification-system';
import { browserHistory } from 'react-router';
const utils = require('./../../utils/utils.js')

class Login extends React.Component{

  constructor(){
    super()

    this.state = {
      isLoggedIn: undefined
    }

  // _notificationSystem: null

  // componentDidMount()  {
  //   this._notificationSystem = this.refs.notificationSystem
  // }

  this.handleChange = (event) => {
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState)
    console.log(newState)
  }
  this.handleSubmit = (event) => {
    event.preventDefault();
    utils.default.login({
      email: this.state.email,
      password: this.state.password,
    }).then((user) => {
      console.log('state ' + JSON.stringify(this.state))
      console.log('user  ' + user)
      if(!user) {
        // this._notificationSystem.addNotification({
        //   message:'Incorrect Email/Password',
        //   level: 'error',
        //   position: 'tr'
        // });
        browserHistory.push('/')
      } else {
        browserHistory.push('/')
      }
    });
    }
  }
  render() {
    return(
      <div className="row" id="login">

        <div className="col-md-6 col-md-offset-3">
          <h2> Login </h2>
          <div className="panel panel-default">
            <div className="panel-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" placeholder="Email" className="form-control" id="email" onChange={this.handleChange} required />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" className="form-control" id="password" onChange={this.handleChange} required />
                </div>
                <button type="submit" className="btn btn-default btn-sm button-signin">
                Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Login;

      // <NotificationSystem ref="notificationSystem" />
