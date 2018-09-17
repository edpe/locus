import React, { Component } from "react";
import play from "./play-button.svg";
import stop from "./stop-button.svg";
import pause from "./pause-button.svg";
import Agent from "simple-agent";

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { bpm: 120 };
    this.agentEd = new Agent();

    this.startTransport = this.startTransport.bind(this);
    this.stopTransport = this.stopTransport.bind(this);
    this.pauseTransport = this.pauseTransport.bind(this);
    this.handleBpmChange = this.handleBpmChange.bind(this);
  }

  startTransport() {
    this.agentEd.startTransport();
  }

  stopTransport() {
    this.agentEd.stopTransport();
  }

  pauseTransport() {
    this.agentEd.pauseTransport();
  }

  handleBpmChange(event) {
    const target = event.currentTarget;
    const value = target.value;

    this.setState(state => ({ bpm: value }));
    this.agentEd.setBPM(this.state.bpm);
  }

  componentDidMount() {
    this.agentEd.addLoop("C2", "8n", "4n"); //note, length, loop interval
    this.agentEd.addChord(["A2", "C3", "E3", "A3"], "16n");
    this.agentEd.addChord(["A3", "C4", "E4", "A4"], "16n");
    this.agentEd.addPattern(
      ["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"],
      "up",
      "8n"
    ); //notes to play, order to play them in, length of notes
    this.agentEd.addPattern(["C5", "G4", "E3", "C4"], "up", "4n");

    //   this.agentEd.playLoop(0, 0, "4m"); // loop number, start time, end time
    // this.agentEd.playChord(0, 0, 4, "1m"); // chord index, start, repeats, length
    // this.agentEd.playChord(1, 0, 4, "1m"); // chord index, start, repeats, length
    this.agentEd.playPattern(0, 0, "8m"); // index of patern to play, start point, end point(bars/measures)
    // this.agentEd.playPattern(1, 0, "4m"); // index of patern to play, start point, end point(bars/measures)
  }

  render() {
    return (
      <div>
        <label>
          {" "}
          BPM:
          <input
            type="number"
            id="bpmValue"
            name="bpmValue"
            value={this.state.bpm}
            onChange={this.handleBpmChange}
          />
        </label>
        <br />
        <button>
          <img src={play} alt="play" onClick={this.startTransport} />
        </button>
        <button>
          <img src={stop} alt="stop" onClick={this.stopTransport} />
        </button>
        <button>
          <img src={pause} alt="pause" onClick={this.pauseTransport} />
        </button>
        <pre />
      </div>
    );
  }
}
