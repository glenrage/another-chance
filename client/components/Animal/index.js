import React from 'react';
import MainView from './MainView';
import { connect } from 'react-redux';
import agent from '../../agent';
import AnimalFeed from './AnimalFeed'
import AnimalEdit from './AnimalEdit'
// import Search from './Search';

const mapStateToProps = state => ({
  ...state.animal,
  currentUser: state.common.currentUser,
  searchTerm: state.animal.searchTerm,
  searchInput: state.animal.searchInput
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'ANIMAL_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({ type: 'ANIMAL_PAGE_UNLOADED' }),
  onChangeSearch: value =>
    dispatch({ type: 'UPDATE_SEARCH_TERM', value }),
  onSelectSearchInput: value =>
    dispatch({ type: 'SET_SEARCH_TERM', value })
})

class Animal extends React.Component{
  constructor(){
    super()

    this.changeSearch = event => this.props.onChangeSearch(event.target.value);
    this.selectSearchInput = event => this.props.onSelectSearchInput(event.target.value);
  }

  componentWillMount(){
    this.props.onLoad(agent.Animals.all())
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const search = this.props.name
    console.log(this.props)
    if(!this.props.animals) {
      return null;
    }


    return (

      <div className="animal-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">

              <h3>Donantes de animales</h3>
                <p>Utilizar la búsqueda para encontrar animales. Puede filtrar los animales por nombre, raza, tipo, tipo de sangre y ubicación.</p>
                    <form className="form-inline">
                      <b>Buscar</b>
                          <input
                            type="text"
                            className="form-control"

                            value={search}
                            onChange={this.changeSearch}
                          />
                          <select
                            className="form-control"
                            name="properties"

                            onChange={this.selectSearchInput}>

                            <option value="name">por Nombre</option>
                            <option value="type">por Tipo</option>
                            <option value="breed">por Raza</option>
                            <option value="bloodType">por Tipo de Sangre</option>
                            <option value="location">por Localizacion</option>
                          </select>
                      </form>
                    </div>

                    </div>
          <div className="row" id="animal-list">

            <hr />
            <AnimalFeed
            animal={this.props.animals}
            searchTerm={this.props.searchTerm}
            searchInput={this.props.searchInput}
            />

          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animal)
