import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddNewPlayerForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    newPlayerInputValue: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  };

  _onInputChange = e => {
    const { onInputChange } = this.props;

    onInputChange && onInputChange(e);
  };

  _onSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();
    onSubmit && onSubmit();
  };

  render() {
    const { newPlayerInputValue, disabled } = this.props;

    return (
      <form onSubmit={this._onSubmit}>
        <input onChange={this._onInputChange} value={newPlayerInputValue} type="text" name="new-player-username" />
        <button disabled={disabled} type="submit">
          Add
        </button>
      </form>
    );
  }
}

export default AddNewPlayerForm;
