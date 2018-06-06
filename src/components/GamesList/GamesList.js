import React, { Component } from 'react';
import Game from './Game';
import PropTypes from 'prop-types';
import './GamesList.scss';

export default class GamesList extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onButtonClick: PropTypes.func.isRequired,
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

  _onButtonClick = () => {
    const { onButtonClick } = this.props;

    onButtonClick && onButtonClick();
  };

  render() {
    const { list, disabled, empty } = this.props;

    return (
      <div className="GamesList">
        <button disabled={disabled} onClick={this._onButtonClick}>
          Find games
        </button>
        {empty ? (
          <div>No games found</div>
        ) : (
          <div className="GamesList__wrapper">{list.map(x => <Game key={x.appid} {...x} />)}</div>
        )}
      </div>
    );
  }
}
