import React from 'react';
import About from './About';
import Banner from './Banner';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Banner />
        <About />
      </div>
    )
  }
}

export default Home
