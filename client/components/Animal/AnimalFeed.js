import React from 'react';
import AnimalEdit from './AnimalEdit'

const AnimalFeed = props => {

  if(!props.animal) {
    return (
      <div className="animal-preview"> Loading... </div>
    );
  }

  if(props.animal.length === 0) {
    return (
      <div className="animal-preview"> No animals yet </div>
    );
  }


  // const canEdit = this.props.currentUser && this.props.currentUser.firstName === this.props.animals[0].createdBy.firstName

  return (
    <div>
    {
      props.animal.map((animal, index) => {
        console.log(props)
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

              <AnimalEdit
                animal={animal}
                 />
              </div>
            </div>
        );
      })
    }
    </div>
  );
};

export default AnimalFeed

// canEdit={canEdit}
