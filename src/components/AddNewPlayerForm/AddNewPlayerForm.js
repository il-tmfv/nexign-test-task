import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddNewPlayerForm.scss';

class AddNewPlayerForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onFindGamesClick: PropTypes.func.isRequired,
    newPlayerInputValue: PropTypes.string.isRequired,
    disabledSubmit: PropTypes.bool,
    disabledInput: PropTypes.bool,
    disabledFindGames: PropTypes.bool,
  };

  _onInputChange = e => {
    const { onInputChange } = this.props;

    onInputChange && onInputChange(e);
  };

  _onFindGamesClick = () => {
    const { onFindGamesClick } = this.props;
    onFindGamesClick && onFindGamesClick();
  };

  _onSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();
    onSubmit && onSubmit();
  };

  render() {
    const { newPlayerInputValue, disabledSubmit, disabledInput, disabledFindGames } = this.props;

    return (
      <form onSubmit={this._onSubmit} className="AddNewPlayerForm">
        <input
          disabled={disabledInput}
          onChange={this._onInputChange}
          value={newPlayerInputValue}
          type="text"
          name="new-player-username"
        />
        <button disabled={disabledSubmit} type="submit">
          Add
        </button>
        <button disabled={disabledFindGames} type="button" onClick={this._onFindGamesClick}>
          Find games
        </button>
      </form>
    );
  }
}

export default AddNewPlayerForm;
