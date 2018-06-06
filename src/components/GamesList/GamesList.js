import React, { Component } from 'react';
import Game from './Game';
import PropTypes from 'prop-types';

export default class GamesList extends Component {
  static propTypes = {
    onButtonClick: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        appid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
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
    const { list } = this.props;

    return (
      <div>
        <button onClick={this._onButtonClick}>Find games</button>
        {list.map(x => <Game key={x.appid} appid={x.appid} name={x.name} />)}
      </div>
    );
  }
}
