import React from 'react';
import AnimalActions from './AnimalActions';

const AnimalEdit = props => {
  console.log(props)
  const animal = props.animal;

  return (
    <div className="animal-edit">
      <span className="date">
        <h2>Animal acions</h2>
      </span>

      <AnimalActions canEdit={props.canEdit} animal={animal} />
    </div>
  )
}

export default AnimalEdit;
