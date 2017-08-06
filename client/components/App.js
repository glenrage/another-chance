import React from 'react';
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.appName
})

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="main-container">
      <Header />
      <Home />
      <Footer />
      </div>
    )
  }
}

export default connect(mapStateToProps, () => ({}))(App);
