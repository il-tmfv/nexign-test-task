import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Player extends PureComponent {
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
