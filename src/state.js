import { observable, decorate, action, runInAction, computed } from 'mobx';
import { getSteamIdByCommunityUrl, getCommonMultiplayerGames } from './api';
import { SteamIdException, FetchException } from './api/errors';

class State {
  players = [];
  games = [];
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
    return this.players.length < 2;
  }

  tryGetGames = async () => {
    this.loading = true;
    try {
      const games = await getCommonMultiplayerGames(this.steamids);
      console.log(games);
      runInAction(() => {
        this.games = games;
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
}

decorate(State, {
  players: observable,
  games: observable,
  error: observable,
  loading: observable,
  newPlayerInputValue: observable,
  onFormInputChange: action,
  addNewPlayer: action,
  steamids: computed,
  addNewPlayerDisabled: computed,
  getGamesDisabled: computed,
});

export default new State();
