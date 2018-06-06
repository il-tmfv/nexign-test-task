import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Player.scss';

export default class Player extends PureComponent {
  static propTypes = {
    username: PropTypes.string.isRequired,
    steamid: PropTypes.string.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
  };

  _onDeleteClick = () => {
    const { onDeleteClick, steamid } = this.props;
    onDeleteClick && onDeleteClick(steamid);
  };

  render() {
    const { username, steamid } = this.props;

    return (
      <div className="Player">
        <div className="Player__texts">
          <div className="Player__username">{username}</div>
          <div className="Player__steamid">{`id:${steamid}`}</div>
        </div>
        <button className="Player__delete-btn" onClick={this._onDeleteClick}>
          X
        </button>
      </div>
    );
  }
}
