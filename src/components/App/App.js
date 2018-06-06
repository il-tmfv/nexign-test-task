import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import './App.scss';
import AddNewPlayerForm from 'components/AddNewPlayerForm';
import Error from 'components/Error';
import PlayersList from 'components/PlayersList';
import GamesList from 'components/GamesList';
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
        <PlayersList list={toJS(state.players)} />
        <GamesList onButtonClick={() => state.tryGetGames()} list={toJS(state.games)} />
      </div>
    );
  }
}

export default observer(App);
