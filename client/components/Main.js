import React from 'react';
import Navbar from './Navbar'
import Footer from './Footer'

class Main extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="main-container">
      <Navbar />
        {this.props.children}
      <Footer />
      </div>
    )
  }
}

export default Main
