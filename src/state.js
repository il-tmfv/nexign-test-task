import { observable, decorate, action, runInAction, computed } from 'mobx';
import { getSteamIdByCommunityUrl, getCommonMultiplayerGames } from './api';
import { SteamIdException, FetchException } from './api/errors';

class State {
  _inputRef = null;
  players = [];
  games = [];
  noGamesFound = false;
  error = '';
  loading = false;
  newPlayerInputValue = '';

  onFormInputChange = e => {
    this.newPlayerInputValue = e.target.value;
  };

  get steamids() {
    return this.players.map(x => x.steamid);
  }

  get addNewPlayerDisabled() {
    return (
      this.newPlayerInputValue === '' || this.loading || this.players.some(x => x.username === this.newPlayerInputValue)
    );
  }

  get getGamesDisabled() {
    return this.players.length < 2 || this.loading;
  }

  deletePlayer = steamid => {
    this.players = this.players.filter(x => x.steamid !== steamid);
  };

  tryGetGames = async () => {
    this.loading = true;
    try {
      const games = await getCommonMultiplayerGames(this.steamids);
      runInAction(() => {
        this.games = games || [];
        this.noGamesFound = this.games.length === 0;
        this.error = '';
      });
    } catch (e) {
      runInAction(() => {
        if (e instanceof SteamIdException) {
          this.error = 'Error: unable to get steamid. Please, check entered username';
        } else if (e instanceof FetchException) {
          this.error = 'Error: network error';
        } else {
          this.error = 'UnknownError';
        }
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  tryAddNewPlayer = async () => {
    this.loading = true;

    try {
      const steamid = await getSteamIdByCommunityUrl(this.newPlayerInputValue);
      runInAction(() => {
        this.players.push({ username: this.newPlayerInputValue, steamid });
        this.newPlayerInputValue = '';
        this.error = '';
        this._focusOnInput();
      });
    } catch (e) {
      runInAction(() => {
        if (e instanceof SteamIdException) {
          this.error = 'Error: unable to get steamid. Please, check entered username';
        } else if (e instanceof FetchException) {
          this.error = 'Error: network error';
        } else {
          this.error = 'UnknownError';
        }
        this._focusOnInput(true);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setInputRef = ref => {
    this._inputRef = ref;
  };

  _focusOnInput = (select = false) => {
    if (this._inputRef) {
      setTimeout(() => {
        this._inputRef.focus();
        if (select) {
          this._inputRef.select();
        }
      }, 0);
    }
  };
}

decorate(State, {
  players: observable,
  games: observable,
  noGamesFound: observable,
  error: observable,
  loading: observable,
  newPlayerInputValue: observable,
  onFormInputChange: action,
  deletePlayer: action,
  deleteGame: action,
  tryAddNewPlayer: action,
  tryGetGames: action,
  steamids: computed,
  addNewPlayerDisabled: computed,
  getGamesDisabled: computed,
});

export default new State();
