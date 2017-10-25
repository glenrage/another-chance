import React from 'react';
import { connect } from 'react-redux';
import agent from '../../agent';
import AnimalFeed from './AnimalFeed';
import AnimalEdit from './AnimalEdit';

const mapStateToProps = state => ({
  ...state.animal,
  currentUser: state.common.currentUser,
  searchTerm: state.animal.searchTerm
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: 'ANIMAL_PAGE_LOADED', payload }),
  onUnload: () => dispatch({ type: 'ANIMAL_PAGE_UNLOADED' }),
  onChangeSearch: value => dispatch({ type: 'UPDATE_SEARCH_TERM', value })
});

class Animal extends React.Component {
  constructor() {
    super();

    this.changeSearch = event => {
      event.preventDefault();
      this.props.onChangeSearch(event.target.value);
    };
  }

  componentWillMount() {
    this.props.onLoad(agent.Animals.all());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const search = this.props.searchTerm;
    if (!this.props.animals) {
      return null;
    }

    return (
      <div className="animal-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h3>Búsqueda de donantes</h3>
              <p>
                Escriba una palabra clave de búsqueda a continuación. Usted
                puede buscar el nombre del animal, localización, tipo de sangre,
                raza animal o tipo de animal.
              </p>

              <form className="form-inline">
                <b>Buscar</b>
                <input
                  type="text"
                  className="form-control"
                  id="search-input"
                  value={search}
                  onChange={this.changeSearch}
                />
              </form>
            </div>
          </div>
          <div className="row" id="animal-list">
            <hr />
            <AnimalFeed
              animal={this.props.animals}
              searchTerm={this.props.searchTerm}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animal);
