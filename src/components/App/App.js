import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import './App.scss';
import AddNewPlayerForm from 'components/AddNewPlayerForm';
import Error from 'components/Error';
import PlayersList from 'components/PlayersList';
import GamesList from 'components/GamesList';
import Loading from 'components/Loading';
import state from '../../state';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Error text={state.error} />
        <AddNewPlayerForm
          disabledSubmit={state.addNewPlayerDisabled}
          disabledInput={state.loading}
          newPlayerInputValue={state.newPlayerInputValue}
          onInputChange={state.onFormInputChange}
          onSubmit={state.tryAddNewPlayer}
          onFindGamesClick={state.tryGetGames}
          disabledFindGames={state.getGamesDisabled}
          loading={state.loading && <Loading />}
        />
        <PlayersList list={toJS(state.players)} onDeleteClick={state.deletePlayer} />
        <GamesList list={toJS(state.games)} empty={state.noGamesFound} />
      </div>
    );
  }
}

export default observer(App);
