import React, { Component } from "react";
import Player from "player";

// pull in graphing/waveform lib
export default class PlayerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.player = new Player();
  }

  render() {
    return (
      <div>
        <button
          name="play pattern"
          alt="make pattern"
          onClick={this.player.playPattern(0, 0, "8m")}
        >
          make a pattern
        </button>
        <pre />
      </div>
    );
  }
}
