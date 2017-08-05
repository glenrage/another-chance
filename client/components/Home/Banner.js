import React from 'react';
import { Link } from 'react-router';

class Banner extends React.Component {
  render(){
    return (
      <div className="row" id="banner">
        <div id="banner-logo">
          <span id="logo-text">Otra Opportunidad </span>
        </div>
        <div id="button-section">
          <div id="button-div">
            <Link to="/login"> <button type="button" className="btn btn-secondary btn-lg">Login</button></Link>
            <Link to="/signup"> <button type="button" className="btn btn-secondary btn-lg">Sign up</button></Link>
          </div>
        </div>
      </div>

    )
  }
}

export default Banner
