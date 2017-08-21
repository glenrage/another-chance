import React from 'react';
import { connect } from 'react-redux';
import About from './About';
import Banner from './Banner';

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.common.appName,
});

// mapDispatchToProps maps a dispatch function to actions
// component can now call this.props.onLoad to fire off an event
// HOME PAGE LOADED, payload contains HTTP promise
const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'HOME_PAGE_LOADED', payload }),
});
// each function that mapDispatchToProps returns gets attached to components props.

class Home extends React.Component {
  // Life cycle hook that gets called when component is created.
  // This function is invoked immediately before component is rendered, ideal for AJAX requests

  render() {
    return (
      <div className="container-fluid">
        <Banner appName={this.props.appName} />

        <About />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
