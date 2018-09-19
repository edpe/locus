import React, { Component } from "react";
import Composer from "composer";
import Player from "./Player";

// pull in graphing/waveform lib
export default class ComposerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.composer = new Composer();
    this.patterns = this.composer.patterns

  }

  viewPatterns = () => {
    console.log(this.patterns);
  };

  addPattern = () => {
    this.composer.makePattern(8, 5, "up", "8n");
  };

  render() {
    return (
      <div>
        <button onClick={this.addPattern}>make a pattern</button>
        <button onClick={this.viewPatterns}>view patterns</button>
        <div>
          <Player patterns={this.patterns}/>
        </div>
      </div>

    );
  }
}
