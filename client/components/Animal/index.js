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
  searchTerm: state.animal.searchTerm
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
    dispatch({ type: 'ANIMAL_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({ type: 'ANIMAL_PAGE_UNLOADED' }),
  onChangeSearch: value =>
    dispatch({ type: 'UPDATE_SEARCH_TERM', key:'name', value }),
  setSearchTerm: searchTerm =>
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm })
})

class Animal extends React.Component{
  constructor(){
    super()

    this.changeSearch = event => this.props.onChangeSearch(event.target.value);
  }

  componentWillMount(){
    this.props.onLoad(agent.Animals.all())
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const search = this.props.name;

    if(!this.props.animals) {
      return null;
    }


    return (

      <div className="animal-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h3>Animal List</h3>
                <p> Use the search to find animals</p>
                  </div>
                  <div className="col-md-6" id="search-section">
                    <form className="form-inline">
                      <b>Search</b>
                        <div className="form-group">
                          <input
                            type="search"
                            placeholder="search"
                            className="form-control"
                            value={search}
                            onChange={this.changeSearch}
                          />
                        </div>
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animal)
