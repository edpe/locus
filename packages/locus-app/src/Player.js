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
  alt="play pattern"
  onClick={this.player.playPattern(0, 0, "8m")}
>
  play a pattern
</button>

      </div>
    );
  }
}
