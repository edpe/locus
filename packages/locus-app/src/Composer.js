import React, { Component } from "react";
import Composer from "composer";
import Player from "./Player";

// pull in graphing/waveform lib
export default class ComposerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {patterns: []};
    this.composer = new Composer();

  }

  viewPatterns = () => {
    console.log(this.state.patterns);
  };

  addPattern = () => {
    const patternToPush = this.composer.makePattern(8, 5, "up", "8n");
    var nextPatterns = this.state.patterns;
    nextPatterns.push(patternToPush)
    this.setState({patterns: nextPatterns});
  };

  render() {
    return (
      <div>
        <button onClick={this.addPattern}>make a pattern</button>
        <button onClick={this.viewPatterns}>view patterns</button>
        <p />
        <div>
          <Player patterns={this.state.patterns}/>
        </div>
      </div>

    );
  }
}
