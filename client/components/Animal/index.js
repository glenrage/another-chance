import React from 'react';
import MainView from './MainView';
import { connect } from 'react-redux';
import agent from '../../agent';
import AnimalFeed from './AnimalFeed'
import AnimalEdit from './AnimalEdit'

const mapStateToProps = state => ({
  animals: state.animal.animals,
  currentUser: state.common.currentUser
});

// const mapStateToProps = state => ({
//   ...state.animal,
//   currentUser: state.common.currentUser
// })

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'ANIMAL_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({ type: 'ANIMAL_PAGE_UNLOADED' })
})

class Animal extends React.Component{
  componentWillMount(){
    this.props.onLoad(agent.Animals.all())
    // this.props.onLoad(Promise.all([
    //   agent.Animals.get(this.props.params.id)
    // ]))
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    console.log(this.props)
    if(!this.props.animals) {
      return null;
    }


    return (
      <div className="animal-page">
        <div className="container-fluid">
          <AnimalFeed
            animals={this.props.animals} />

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animal)
