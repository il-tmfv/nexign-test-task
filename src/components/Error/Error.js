import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Error extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '',
  };

  render() {
    const { text } = this.props;

    return text ? <div>{text}</div> : null;
  }
}
