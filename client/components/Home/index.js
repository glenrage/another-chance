import React from 'react';
import About from './About';
import Banner from './Banner';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.common.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'HOME_PAGE_LOADED', payload })
});

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="main-container">
        <Banner />
        <About />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
