//MainView contains the animals entry feed list

import React from 'react';
import AnimalFeed from './AnimalFeed';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  animals: state.animal.animals
});

const MainView = props => {
  return (
    <div className="col-md-10">
      <AnimalFeed
        animals={ props.animals }
      />
    </div>

  )
}

export default connect(mapStateToProps, () => ({}))(MainView)
