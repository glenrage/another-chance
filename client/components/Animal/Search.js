import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state = ({
  ...state.animal,
  searchTerm: state.animal.searchTerm
})

const mapDispatchToProps = dispatch = ({
  handleSearchTermChange: value =>
    dispatch({ type: 'UPDATE_SEARCH_TERM', key:'search', value }),
  setSearchTerm: searchTerm =>
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm })
})

class Search extends React.Component {
  constructor(){
    super()

    this.changeSearch = event => this.props.onChangeSearch(event.target.value);

  }

  render(){

    return(

      <form className="form-inline">
        <b>Search</b>
          <div className="form-group">
            <input
              type="text"
              placeholder="keywords"
              className="form-control"
              name="name"
              value={this.props}
              onChange={this.changeSearch}
            />
          </div>


        </form>
    )
  }

}

// export default Search;

export default connect(mapStateToProps, mapDispatchToProps)(Search)

// <div className="form-group">
  <select
    className="form-control"
    name="properties"
    onChange={this.changeSearch}>

    <option value="name">by Name</option>
    <option value="type">by Type</option>
    <option value="breed">by Breed</option>
    <option value="bloodType">by Blood Type</option>
    <option value="location">by Location</option>
  </select>
// </div>
// <button type="submit" className="btn btn-default btn-sm">Submit</button>
