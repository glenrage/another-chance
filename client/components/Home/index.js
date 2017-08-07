import React from 'react';
import About from './About';
import Banner from './Banner';
import MainView from './MainView';
import agent from '../../agent';
import { connect } from 'react-redux';

const Promise = global.Promise;

const mapStateToProps = state => ({
  appName: state.common.appName
});

//mapDispatchToProps maps a dispatch function to actions
//component can now call this.props.onLoad to fire off an event HOME PAGE LOADED, payload contains HTTP promise
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'HOME_PAGE_LOADED', payload })
})
//each function that mapDispatchToProps returns gets attached to components props.


class Home extends React.Component {
  //Life cycle hook that gets called when component is created. This function is invoked immediately before component is rendered, ideal for AJAX requests
  componentWillMount(){
    this.props.onLoad(agent.Animals.all())
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Banner appName={this.props.appName}/>

          <MainView />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
