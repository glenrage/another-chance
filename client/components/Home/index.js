import React from 'react';
import About from './About';
import Banner from './Banner';
import { connect } from 'react-redux';

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.common.appName
});

//mapDispatchToProps maps a dispatch function to actions
//component can now call this.props.onLoad to fire off an event HOME PAGE LOADED, payload contains HTTP promise
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'HOME_PAGE_LOADED', payload })
});
//each function that mapDispatchToProps returns gets attached to components props.

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
