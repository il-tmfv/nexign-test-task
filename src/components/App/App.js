import React, { Component } from 'react';
import './App.scss';
import AddNewPlayerForm from 'components/AddNewPlayerForm/AddNewPlayerForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddNewPlayerForm onSubmit={()=>{}} />
      </div>
    );
  }
}

export default App;
