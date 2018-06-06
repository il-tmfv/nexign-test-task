import { observable, decorate, action } from 'mobx';
import api from './api';

class State {
  players = [];
  error = '';
  loading = false;
  newPlayerInputValue = '';

  onFormInputChange = e => {
    this.newPlayerInputValue = e.target.value;
  };

  clearFormInput = () => {
    this.newPlayerInputValue = '';
  };

  setError = (text = '') => {
    this.error = text;
  };

  addNewPlayer = () => {
    this.loading = true;
    this.clearFormInput();
  };
}

decorate(State, {
  players: observable,
  error: observable,
  loading: observable,
  newPlayerInputValue: observable,
  onFormInputChange: action,
  clearFormInput: action,
  setError: action,
  addNewPlayer: action,
});

export default new State();
