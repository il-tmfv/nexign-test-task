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
    loading: PropTypes.node.isRequired,
    onInputRefReady: PropTypes.func.isRequired,
  };

  _onSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();
    onSubmit && onSubmit();
  };

  render() {
    const {
      newPlayerInputValue,
      disabledSubmit,
      disabledInput,
      disabledFindGames,
      loading,
      onInputRefReady,
      onInputChange,
      onFindGamesClick,
    } = this.props;

    return (
      <form onSubmit={this._onSubmit} className="AddNewPlayerForm">
        <input
          ref={onInputRefReady}
          disabled={disabledInput}
          onChange={onInputChange}
          value={newPlayerInputValue}
          type="text"
          name="new-player-username"
          autoFocus
          placeholder="steamcommunity id"
        />
        <button disabled={disabledSubmit} type="submit">
          Add
        </button>
        <button disabled={disabledFindGames} type="button" onClick={onFindGamesClick}>
          Find games
        </button>
        {loading}
      </form>
    );
  }
}

export default AddNewPlayerForm;
