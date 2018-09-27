import React, { Component } from "react";
import Interpreter from "interpreter";
import Player from "./Player";

export default class InterpreterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {patterns: []};
    this.interpreter = new Interpreter(this.props.tone, this.props.role);

  }

  viewPatterns = () => {
    console.log(this.state.patterns);
  };

  addInterpretedPattern = () => {
    const patternToPush = this.interpreter.makeInterpretedPattern(); //number of notes, octave, notes order, note length, playback rate
    var nextPatterns = this.state.patterns;
    nextPatterns.push(patternToPush)
    this.setState({patterns: nextPatterns});
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <button onClick={this.addInterpretedPattern}>make a pattern</button>
        <button onClick={this.viewPatterns}>view patterns</button>
        <p />
        <div>
          <Player patterns={this.state.patterns}/>
        </div>
      </div>

    );
  }
}
