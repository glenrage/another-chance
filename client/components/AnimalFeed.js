import React from 'react';

const AnimalFeed = props => {
  if(!props.animals) {
    return (
      <div className="animal-preview"> Loading... </div>
    );
  }

  if(props.animals.length === 0) {
    return (
      <div className="animal-preview"> No animals yet </div>
    );
  }

  return (
    <div>
    {
      props.animals.map(animal => {
        return (
          <h2> {animal.name} </h2>
        );
      })
    }
    </div>
  );
};

export default AnimalFeed
