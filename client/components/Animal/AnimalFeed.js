import React from 'react';
import AnimalEdit from './AnimalEdit';

const AnimalFeed = props => {
  const animals = props.animal;
  if (!props.animal) {
    return <div className="animal-preview"> Cargando </div>;
  }

  if (props.animal.length === 0) {
    return <div className="animal-preview"> Aún no hay animales </div>;
  }

  return (
    <div>
      {props.animal
        .filter(
          el =>
            `${el.name} ${el.type} ${el.breed} ${el.bloodType} ${el.location}`
              .toUpperCase()
              .indexOf(props.searchTerm.toUpperCase()) >= 0
        )
        .map((animal, index) => {
          return (
            <div className="col-sm-3 col-sm-3" key={index}>
              <div className="animal-block">
                <p className="animal-title">
                  <strong> {animal.name} </strong>
                </p>
                <p className="animal-list">
                  <strong>Tipo:</strong> {animal.type}
                </p>
                <p className="animal-list">
                  <strong>Raza:</strong> {animal.breed}
                </p>
                <p className="animal-list">
                  <strong>Peso:</strong> {animal.weight}
                </p>
                <p className="animal-list">
                  <strong>Años:</strong> {animal.age}
                </p>
                <p className="animal-list">
                  <strong>Tipo de Sangre:</strong> {animal.bloodType}
                </p>
                <p className="animal-list">
                  <strong>Contacto:</strong> {animal.contactName}
                </p>
                <p className="animal-list">
                  <strong>Número :</strong> {animal.contactNumber}
                </p>
                <p className="animal-list">
                  <strong>Email :</strong> {animal.contactEmail}
                </p>
                <p className="animal-list">
                  <strong>Veterinario:</strong> {animal.vetName}
                </p>
                <p className="animal-list">
                  <strong>Localización:</strong> {animal.location}
                </p>
                <p className="animal-list">
                  <strong>Creado por:</strong> {animal.createdBy.firstName}
                </p>

                <AnimalEdit animal={animal} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AnimalFeed;
