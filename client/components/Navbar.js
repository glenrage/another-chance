import React from 'react'
import { Link } from 'react-router';

class Navbar extends React.Component {
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
              <li className="active"><Link to="#root"><span className="icon"></span>Casa</Link></li>
              <li className="active"><Link to="#about-us"><span className="icon"></span>Acerca De</Link></li>
              <li><Link to="/auth"><span className="glyphicon glyphicon-log-in"></span> Auth</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    )
  }
}

export default Navbar
