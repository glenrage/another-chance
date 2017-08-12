import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  animals: state.animal.animals,
})

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_ANIMAL', payload })
});

const AnimalActions = props => {
  const animal = props.animal;
  const del = () => {
    props.onClickDelete(agent.Animals.del(animal.slug))
  };

  // if(props.canEdit) {
    return (
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
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(AnimalActions)
