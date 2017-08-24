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
        <button className="btn btn-info btn-sm">
        <Link
          to={`/animalform/${animal.slug}`}
          className="">
          <i className="fa fa-pencil-square-o"></i>Editar
        </Link>
      </button>

        <button className="btn btn-danger btn-sm" onClick={del}>
          <i className="fa fa-trash-o"></i>Borrar
        </button>
      </span>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(AnimalEdit)
