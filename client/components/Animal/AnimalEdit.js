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
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i>Edit Animal
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i>Delete Animal
        </button>
      </span>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(AnimalEdit)
