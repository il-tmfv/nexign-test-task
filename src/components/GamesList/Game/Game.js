import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Game extends Component {
  static propTypes = {
    appid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { appid, name } = this.props;

    return (
      <div>
        <div>{appid}</div>
        <div>{name}</div>
      </div>
    );
  }
}
