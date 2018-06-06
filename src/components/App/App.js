import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.scss';
import AddNewPlayerForm from 'components/AddNewPlayerForm';
import Error from 'components/Error';
import state from '../../state';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Error text={state.error} />
        <AddNewPlayerForm
          disabled={state.loading}
          newPlayerInputValue={state.newPlayerInputValue}
          onInputChange={e => state.onFormInputChange(e)}
          onSubmit={() => state.tryAddNewPlayer()}
        />
      </div>
    );
  }
}

export default observer(App);
