import React, { Component } from "react";
import Player from "player";

// pull in graphing/waveform lib
export default class PlayerWrapper extends Component {
  constructor(props) {
    super(props);
    this.player = new Player();
  }

  playPattern = () => {
    this.player.playPattern(this.props.patterns, 0)
  }

  render() {
    return (
      <div>
<button
  name="play pattern"
  alt="play pattern"
  onClick={this.playPattern}
>
  play a pattern
</button>

      </div>
    );
  }
}
