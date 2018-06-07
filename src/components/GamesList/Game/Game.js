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
        <div className="Game__data-col">
          <div className="Game__name">{name}</div>
          <div className="Game__genre">{genre}</div>
        </div>
        <div className="Game__userscore">{userscore}</div>
        <a className="Game__launch-link" href={`steam://run/${appid}`}>
          Go!
        </a>
      </div>
    );
  }
}
