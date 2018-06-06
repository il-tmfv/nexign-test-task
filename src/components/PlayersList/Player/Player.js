import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Player extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    steamid: PropTypes.string.isRequired,
  };

  render() {
    const { username, steamid } = this.props;

    return (
      <div>
        <div>{username}</div>
        <div>{steamid}</div>
      </div>
    );
  }
}
