import React from 'react';
import MainView from './MainView';
import { connect } from 'react-redux';
import agent from '../../agent';

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'ANIMAL_PAGE_LOADED', payload})
})

class Animal extends React.Component{

  componentWillMount(){
    this.props.onLoad(agent.Animals.all())
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <MainView />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animal)
