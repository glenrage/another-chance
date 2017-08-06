import React from 'react'
import { Link } from 'react-router';

class Header extends React.Component {
  render() {

    return(
      <div className="row-header">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="ooNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            <Link className="navbar-brand" to="/">
              <img id="nav-img" src="/assets/images/logo.jpg" alt="Logo" />
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="ooNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li className="active"><Link to="#root"><i className="fa fa-home" aria-hidden="true"></i>  Casa</Link></li>
              <li><Link to="#about-us"><i className="fa fa-info" aria-hidden="true"></i> Acerca De</Link></li>
              <li><Link to="/auth"><i className="fa fa-sign-in" aria-hidden="true"></i> Auth</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    )
  }
}

export default Header
