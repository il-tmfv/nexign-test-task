import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Loading.scss';

export default class Loading extends Component {
  static propTypes = {
    show: PropTypes.bool,
  };

  static defaultProps = {};

  render() {
    const { show } = this.props;

    return show ? <div className="Loading">Loading</div> : null;
  }
}
