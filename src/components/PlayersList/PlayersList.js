import React, { Component } from 'react';
import Player from './Player';
import PropTypes from 'prop-types';

export default class PlayersList extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string.isRequired,
        steamid: PropTypes.string.isRequired,
      }),
    ),
  };

  static defaultProps = {
    list: [],
  };

  render() {
    const { list } = this.props;

    return <div>{list.map(x => <Player key={x.steamid} steamid={x.steamid} username={x.username} />)}</div>;
  }
}
