import React, { Component } from "react";
import Player from "player";

// pull in graphing/waveform lib
export default class PlayerWrapper extends Component {
  constructor(props) {
    super(props);
    this.player = new Player();
    this.state = {
      currentPattern: 0
    };
  }

  playPattern = () => {
    this.player.playPattern(this.props.patterns, this.state.currentPattern);
  };

  nextPattern = () => {
    this.player.stopPattern(this.props.patterns, this.state.currentPattern);
    let newCurrentPattern;

    this.state.currentPattern <= this.props.patterns.length
      ? (newCurrentPattern = this.state.currentPattern + 1)
      : (newCurrentPattern = 0);

    this.setState({ currentPattern: newCurrentPattern }, () => {
      this.playPattern(this.props.patterns, this.state.currentPattern);
    });
  };

  render() {
    return (
      <div>
        <button
          name="play pattern"
          alt="play pattern"
          onClick={this.playPattern}
        >
          play pattern
        </button>

        <button
          name="next pattern"
          alt="next pattern"
          onClick={this.nextPattern}
        >
          next pattern
        </button>
      </div>
    );
  }
}
