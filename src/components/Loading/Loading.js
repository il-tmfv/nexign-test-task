import React, { Component } from 'react';
import './Loading.scss';

export default class Loading extends Component {
  state = { ending: '' };

  _intervalRef = null;

  _updateEnding = () => {
    const { ending } = this.state;

    if (ending.length >= 3) {
      this.setState({ ending: '' });
    } else {
      this.setState(prevState => ({ ending: prevState.ending + '.' }));
    }
  };

  componentDidMount() {
    this._intervalRef = setInterval(this._updateEnding, 500);
  }

  componentWillUnmount() {
    if (this._intervalRef) {
      clearInterval(this._intervalRef);
      this._intervalRef = null;
    }
  }

  render() {
    return <div className="Loading">{`Loading${this.state.ending}`}</div>;
  }
}
