import React, { Component } from "react";
import play from "./play-button.svg";
import stop from "./stop-button.svg";
import pause from "./pause-button.svg";
import Conductor from "conductor";

// pull in graphing/waveform lib
export default class ConductorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { bpm: 120 };
    this.conductor = new Conductor();

    this.startTransport = this.startTransport.bind(this);
    this.stopTransport = this.stopTransport.bind(this);
    this.pauseTransport = this.pauseTransport.bind(this);
    this.handleBpmChange = this.handleBpmChange.bind(this);
  }

  startTransport() {
    this.conductor.startTransport();
  }

  stopTransport() {
    this.conductor.stopTransport();
  }

  pauseTransport() {
    this.conductor.pauseTransport();
  }

  handleBpmChange(event) {
    const target = event.currentTarget;
    const value = target.value;

    this.setState(state => ({ bpm: value }));
    this.conductor.setBPM(this.state.bpm);
  }

  componentDidMount() {
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
        <p />
        <div>
        <button>
          <img width="100px" height="100px" src={play} alt="play" onClick={this.startTransport} />
        </button>
        <button>
          <img width="100px" height="100px" src={stop} alt="stop" onClick={this.stopTransport} />
        </button>
        <button>
          <img width="100px" height="100px" src={pause} alt="pause" onClick={this.pauseTransport} />
        </button>
        </div>
        <pre />
      </div>

    );
  }
}
