import React, { Component } from "react";
import play from "./play-button.svg";
import Agent from "simple-agent";

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  constructor(props) {
    super(props);
    this.agentEd = new Agent();

    this.startTransport = this.startTransport.bind(this);
  }

  startTransport() {
    console.log("play button gets pressed");
    console.log(this.agentEd);
    this.agentEd.startTransport();
  }


  componentDidMount() {
    this.agentEd.addLoop("C2", "8n", "4n"); //note, length, loop interval
    this.agentEd.addChord(["A2", "C3", "E3", "A3"], "16n");
    this.agentEd.addChord(["A3", "C4", "E4", "A4"], "16n");
    this.agentEd.addPattern(["C5", "E5", "G5", "C6"], "up", "4n"); //notes to play, order to play them in, length of notes
    this.agentEd.addPattern(["C5", "G4", "E3", "C4"], "up", "4n");

    this.agentEd.playLoop(0, 0, "4m"); // loop number, start time, end time
    this.agentEd.playChord(0, 0, 4, "1m"); // chord index, start, repeats, length
    this.agentEd.playChord(1, 0, 4, "1m"); // chord index, start, repeats, length
    this.agentEd.playPattern(0, 0, "4m"); // index of patern to play, start point, end point(bars/measures)
    this.agentEd.playPattern(1, 0, "4m"); // index of patern to play, start point, end point(bars/measures)
  }

  render() {
    return (
      <div>
        <button>
          <img src={play} alt="play" onClick={this.startTransport} />
        </button>
        <pre />
      </div>
    );
  }
}
