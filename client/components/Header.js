import React from 'react'
import { Link } from 'react-router';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="fa fa-paw"></i>
            Casa
          </Link>
        </li>

        <li className="nav-item">
          <Link to="login" className="nav-link">
            <i className="fa fa-sign-in" aria-hidden="true"></i>
            Iniciar Sesión
          </Link>
        </li>

        <li className="nav-item">
        <Link to="register" className="nav-link">
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          Registrar
        </Link>
      </li>
      </ul>
    );
  }
  return null;
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav navbar-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
          <i className="fa fa-paw"></i>
            Casa
          </Link>
        </li>

        <li className="nav-item">
          <Link to="animalform" className="nav-link">
            <i className="fa fa-plus"></i>Nuevo Animal
          </Link>
        </li>

        <li className="nav-item">
          <Link to="animals" className="nav-link">
            <i className="fa fa-search"></i>Animals
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to="settings"
            className="nav-link">
            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
            {props.currentUser.firstName}
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};


class Header extends React.Component {
  render() {

    return(

        <nav className="navbar navbar-full">
         <Link to="/" className="navbar-brand">
            <img id="nav-img" src="/assets/images/logo.jpg" alt="Logo" />
         </Link>

         <LoggedOutView currentUser={this.props.currentUser} />

         <LoggedInView currentUser={this.props.currentUser} />


     </nav>


    )
  }
}

export default Header
