import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddNewPlayerForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  _onSubmit = e => {
    const { onSubmit } = this.props;

    e.preventDefault();
    onSubmit && onSubmit();
  };

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <input type="text" name="new-player-username" />
        <button type="submit">Add</button>
      </form>
    );
  }
}
