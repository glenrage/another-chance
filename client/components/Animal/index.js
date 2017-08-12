import React from 'react';
import MainView from './MainView';
import { connect } from 'react-redux';
import agent from '../../agent';
import AnimalFeed from './AnimalFeed'
import AnimalEdit from './AnimalEdit'

const mapStateToProps = state => ({
  ...state.animal,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'ANIMAL_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({ type: 'ANIMAL_PAGE_UNLOADED' })
})

class Animal extends React.Component{
  componentWillMount(){
    this.props.onLoad(agent.Animals.all())
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {

    if(!this.props.animals) {
      return null;
    }


    return (

      <div className="animal-page">
        <div className="container-fluid">
        <div>
        {
          this.props.animals.map((animal, index) => {

            return (
              <div className="col-md-3 col-sm-4" key={index}>
                <div className="animal-block clearfix">
                  <p className="animal-title"><strong> {animal.name} </strong></p>
                  <p className="animal-list"><strong>Type:</strong> {animal.type}</p>
                  <p className="animal-list"><strong>Breed:</strong> {animal.breed}</p>
                  <p className="animal-list"><strong>Weight:</strong> {animal.weight}</p>
                  <p className="animal-list"><strong>Age:</strong> {animal.age}</p>
                  <p className="animal-list"><strong>Blood Type:</strong> {animal.bloodType}</p>
                  <p className="animal-list"><strong>Contact Name:</strong> {animal.contactName}</p>
                  <p className="animal-list"><strong>Contact Number:</strong> {animal.contactNumber}</p>
                  <p className="animal-list"><strong>Vet Name:</strong> {animal.vetName}</p>
                  <p className="animal-list"><strong>Location:</strong> {animal.location}</p>
                  <p className="animal-list"><strong>Created By:</strong> {animal.createdBy.firstName}</p>
                  <img src={animal.photo} className="animal-photo" />

                  <AnimalEdit animal={animal} />
                  </div>
                </div>
              );
            })
          }
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animal)
