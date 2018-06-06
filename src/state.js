import { observable, decorate, action, runInAction } from 'mobx';
import { getSteamIdByCommunityUrl } from './api';
import { SteamIdException, FetchException } from './api/errors';

class State {
  players = [];
  error = '';
  loading = false;
  newPlayerInputValue = '';

  onFormInputChange = e => {
    this.newPlayerInputValue = e.target.value;
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
  error: observable,
  loading: observable,
  newPlayerInputValue: observable,
  onFormInputChange: action,
  addNewPlayer: action,
});

export default new State();
