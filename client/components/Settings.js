import ListErrors from './ListErrors';
import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () =>
    dispatch({ type: 'LOGOUT'}),
  onSubmitForm: user =>
    dispatch({ type: 'SETTINGS_SAVED', payload: agent.Auth.save(user) })
});

class SettingsForm extends React.Component {
  constructor () {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      company: '',
      position: '',
      phone: '',
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        firstName: this.props.currentUser.firstName || '',
        lastName: this.props.currentUser.lastName || '',
        company: this.props.currentUser.company || '',
        position: this.props.currentUser.position || '',
        phone: this.props.currentUser.phone || '',
        email: this.props.currentUser.email || '',
        password: this.props.currentUser.password || ''
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        firstName: nextProps.currentUser.firstName,
        lastName: nextProps.currentUser.lastName,
        company: nextProps.currentUser.company,
        position: nextProps.currentUser.position,
        phone: nextProps.currentUser.phone,
        email: nextProps.currentUser.email,
        password: nextProps.currentUser.password
      }));
    }
  }

  render (){
    return (
      <form onSubmit={this.submitForm}>
       <fieldset>

         <fieldset className="form-group">
           <input
             className="form-control"
             type="text"
             placeholder="First Name"
             value={this.state.firstName}
             onChange={this.updateState('firstName')} />
         </fieldset>

         <fieldset className="form-group">
           <input
             className="form-control"
             type="text"
             placeholder="Last Name"
             value={this.state.lastName}
             onChange={this.updateState('lastName')} />
         </fieldset>

         <fieldset className="form-group">
           <input
             className="form-control"
             type="text"
             placeholder="Company"
             value={this.state.company}
             onChange={this.updateState('company')} />
         </fieldset>

         <fieldset className="form-group">
           <input
             className="form-control"
             type="text"
             placeholder="Position"
             value={this.state.position}
             onChange={this.updateState('position')} />
         </fieldset>

         <fieldset className="form-group">
           <input
             className="form-control"
             type="text"
             placeholder="Phone Number"
             value={this.state.phone}
             onChange={this.updateState('phone')} />
         </fieldset>

         <fieldset className="form-group">
           <input
             className="form-control form-control-lg"
             type="email"
             placeholder="Email"
             value={this.state.email}
             onChange={this.updateState('email')} />
         </fieldset>

         <fieldset className="form-group">
           <input
             className="form-control form-control-lg"
             type="password"
             placeholder="New Password"
             value={this.state.password}
             onChange={this.updateState('password')} />
         </fieldset>

         <button
           className="btn btn-lg btn-primary pull-xs-right"
           type="submit"
           disabled={this.state.inProgress}>
           Update Settings
         </button>

       </fieldset>
     </form>
   );
 }
}

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">

              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={this.props.errors}></ListErrors>

              <SettingsForm
                currentUser={this.props.currentUser}
                onSubmitForm={this.props.onSubmitForm} />

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.onClickLogout}>
                Or click here to logout.
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);