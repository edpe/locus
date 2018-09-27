import React, { Component } from "react";
import Improviser from "improviser";
import Player from "./Player";

export default class ImproviserWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {patterns: []};
    this.improviser = new Improviser(this.props.tone, this.props.role);

  }

  viewPatterns = () => {
    console.log(this.state.patterns);
  };

  addImprovisedPattern = () => {
    const patternToPush = this.improviser.makeImprovisedPattern(); //number of notes, octave, notes order, note length, playback rate
    var nextPatterns = this.state.patterns;
    nextPatterns.push(patternToPush)
    this.setState({patterns: nextPatterns});
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <button onClick={this.addImprovisedPattern}>make a pattern</button>
        <button onClick={this.viewPatterns}>view patterns</button>
        <p />
        <div>
          <Player patterns={this.state.patterns}/>
        </div>
      </div>

    );
  }
}
