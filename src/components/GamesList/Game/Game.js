import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Game.scss';

export default class Game extends PureComponent {
  static propTypes = {
    appid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    userscore: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
  };

  render() {
    const { appid, name, userscore, genre } = this.props;

    return (
      <div className="Game">
        <a className="Game__launch-link" href={`steam://run/${appid}`}>
          LAUNCH
        </a>
        <div className="Game__name">{name}</div>
        <div className="Game__metadata">
          <div className="Game__genre">{genre}</div>
          <div className="Game__userscore">{userscore}</div>
        </div>
      </div>
    );
  }
}
