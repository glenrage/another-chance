import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {  };
  }

  componentWillMount() {
    store.subscribe(() => this.setState( store.getState() ));
  }

  render() {
    const onClick = () => store.dispatch({ type: 'TOGGLE' });
    return (
      <div>
        <h1>hello</h1>
        <div>
          learn redux
        <input
          type="checkbox"
          checked={!!this.state.checked}
          onClick={onClick}
          />
        </div>
        {
          this.state.checked ? (<h2>Done!</h2>) : null
        }

      </div>
    );
  }
}

export default App;
