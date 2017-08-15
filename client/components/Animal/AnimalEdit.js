import React from 'react';
import { Link } from 'react-router';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_ANIMAL', payload })
});

const AnimalEdit = props => {
  const animal = props.animal;
  const del = () => {
    props.onClickDelete(agent.Animals.del(animal.slug))
  };

  return (
    <div className="animal-edit">

    <span>
        <Link
          to={`/animalform/${animal.slug}`}
          className="btn-secondary">
          <i className="fa fa-pencil-square-o"></i>Editar Animal
        </Link>

        <button className="btn-danger" onClick={del}>
          <i className="fa fa-trash-o"></i>Borrar Animal
        </button>
      </span>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(AnimalEdit)
