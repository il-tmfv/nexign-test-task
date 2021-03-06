import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

export default class Error extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '',
  };

  render() {
    const { text } = this.props;

    return text ? <div className="Error">{text}</div> : null;
  }
}
