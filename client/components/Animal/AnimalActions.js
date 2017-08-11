import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: 'DELETE_ANIMAL', payload })
});

const AnimalActions = props => {
  const animal = props.animal;
  console.log(props)
  const del = () => {
    props.onClickDelete(agent.Animals.del(animal.slug))
  };

  // if(props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i>Edit Animal
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i>Delete Animal
        </button>
      </span>
    )

}

export default connect(() => ({}), mapDispatchToProps)(AnimalActions)
