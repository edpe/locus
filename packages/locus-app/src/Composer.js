import React, { Component } from "react";

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 5,
      order: "up",
      octave: 4
    };
    this.composer = new Composer();
  }

  componentDidMount() {
    // this.agentEd.addLoop("C2", "8n", "4n"); //note, length, loop interval
    // this.agentEd.addChord(["A2", "C3", "E3", "A3"], "16n");
    // this.agentEd.addChord(["A3", "C4", "E4", "A4"], "16n");
    this.agentEd.addPattern(8, 5, "up", "8n"); //notes to play, order to play them in, length of notes
    // this.agentEd.addPattern(["C5", "G4", "E3", "C4"], "up", "4n");
  }

  render() {
    return (
      <div>
        // insert form here
        <pre />
      </div>
    );
  }
}
