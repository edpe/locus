import React, { Component } from "react";
import Player from "player";

// pull in graphing/waveform lib
export default class PlayerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.player = new Player();
    this.patterns = props.patterns
  }

  playPattern = () => {
    this.player.playPattern(this.patterns, 0, "8m")
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
