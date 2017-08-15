import { Link } from 'react-router';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onChangeFirstName: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'firstName', value }),
  onChangeLastName: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'lastName', value }),
  onChangeSecret: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'secret', value }),
  onSubmit: (firstName, lastName, email, password, secret) => {
    const payload = agent.Auth.register(firstName, lastName, email, password, secret);
    dispatch({ type: 'REGISTER', payload })
  }
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = event => this.props.onChangeEmail(event.target.value);
    this.changePassword = event => this.props.onChangePassword(event.target.value);
    this.changeFirstName = event => this.props.onChangeFirstName(event.target.value);
    this.changeLastName = event => this.props.onChangeLastName(event.target.value);
    this.changeSecret = event => this.props.onChangeSecret(event.target.value);
    this.submitForm = (firstName, lastName, email, password, secret) => event => {
      event.preventDefault();
      this.props.onSubmit(firstName, lastName, email, password, secret);
    }
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const secret = this.props.secret;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Registrar</h1>
              <p className="text-xs-center">
                <Link to="login">
                  ¿Ya tienes una cuenta?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(firstName, lastName, email, password, secret)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Nombre De Pila"
                      value={this.props.firstName}
                      onChange={this.changeFirstName} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Apellido"
                      value={this.props.lastName}
                      onChange={this.changeLastName} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Correo Electrónico"
                      value={this.props.email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Contraseña"
                      value={this.props.password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Palabra de acceso Secreto"
                      value={this.props.secret}
                      onChange={this.changeSecret} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Registrar
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
