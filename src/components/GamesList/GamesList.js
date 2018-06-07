import React, { Component } from 'react';
import Game from './Game';
import PropTypes from 'prop-types';
import './GamesList.scss';

export default class GamesList extends Component {
  static propTypes = {
    empty: PropTypes.bool,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        appid: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        userscore: PropTypes.number.isRequired,
        genre: PropTypes.string.isRequired,
      }),
    ),
  };

  static defaultProps = {
    list: [],
  };

  render() {
    const { list, empty } = this.props;

    return (
      <div className="GamesList">
        {empty ? (
          <div className="GamesList__empty-indicator">No games found :(</div>
        ) : (
          <div className="GamesList__wrapper">{list.map(x => <Game key={x.appid} {...x} />)}</div>
        )}
      </div>
    );
  }
}
