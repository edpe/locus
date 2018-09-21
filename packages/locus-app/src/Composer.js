import React, { Component } from "react";
import Composer from "composer";
import Player from "./Player";

export default class ComposerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {patterns: []};
    this.composer = new Composer(this.props.tone);
  }

  viewPatterns = () => {
    console.log(this.state.patterns);
  };

  addPattern = () => {
    const patternToPush = this.composer.makePattern(8, 3, "up", "4n", 2); //number of notes, octave, notes order, number of bars to play for, playback rate
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
