import React from 'react';
import Navbar from './Navbar.js'

class Main extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="main-container">
      <Navbar />
        {this.props.children}
      </div>
    )
  }
}

export default Main
