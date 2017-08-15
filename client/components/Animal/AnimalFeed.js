import React from 'react';
import AnimalEdit from './AnimalEdit'

const AnimalFeed = props => {
  console.log(props)

  const animals = props.animal
  if(!props.animal) {
    return (
      <div className="animal-preview"> Cargando </div>
    );
  }

  if(props.animal.length === 0) {
    return (
      <div className="animal-preview"> Aún no hay animales </div>
    );
  }


  // const canEdit = this.props.currentUser && this.props.currentUser.firstName === this.props.animals[0].createdBy.firstName

  return (
    <div>
    {
      // props.animal.filter(el => `${el.name} ${el.type} ${el.breed} ${el.bloodType} ${el.location}`.toUpperCase().indexOf(el.name.toUpperCase()) >= 0)
      props.animal
      .map((animal, index) => {
        return (
          <div className="col-md-3 col-sm-4" key={index}>
            <div className="animal-block clearfix">
              <p className="animal-title"><strong> {animal.name} </strong></p>
              <p className="animal-list"><strong>Tipo:</strong> {animal.type}</p>
              <p className="animal-list"><strong>Raza:</strong> {animal.breed}</p>
              <p className="animal-list"><strong>Peso:</strong> {animal.weight}</p>
              <p className="animal-list"><strong>Años:</strong> {animal.age}</p>
              <p className="animal-list"><strong>Tipo de Sangre:</strong> {animal.bloodType}</p>
              <p className="animal-list"><strong>Nombre de Contacto:</strong> {animal.contactName}</p>
              <p className="animal-list"><strong>Número de Contacto:</strong> {animal.contactNumber}</p>
              <p className="animal-list"><strong>Nombre Veterinario:</strong> {animal.vetName}</p>
              <p className="animal-list"><strong>Localización:</strong> {animal.location}</p>
              <p className="animal-list"><strong>Creado por:</strong> {animal.createdBy.firstName}</p>
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
