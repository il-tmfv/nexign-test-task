import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Game extends PureComponent {
  static propTypes = {
    appid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { appid, name } = this.props;

    return (
      <div>
        <a href={`steam://rungameid/${appid}`}>{appid}</a>
        <div>{name}</div>
      </div>
    );
  }
}
