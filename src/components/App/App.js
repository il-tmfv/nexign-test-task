import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.scss';
import AddNewPlayerForm from 'components/AddNewPlayerForm';
import state from '../../state';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddNewPlayerForm
          disabled={state.loading}
          newPlayerInputValue={state.newPlayerInputValue}
          onInputChange={state.onFormInputChange}
          onSubmit={state.addNewPlayer}
        />
      </div>
    );
  }
}

export default observer(App);
