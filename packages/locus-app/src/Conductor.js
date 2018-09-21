import React, { Component } from "react";
import play from "./play-button.svg";
import stop from "./stop-button.svg";
import pause from "./pause-button.svg";
import Conductor from "conductor";

export default class ConductorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { bpm: 120 };
    this.conductor = new Conductor(this.props.transport);
  }

  startTransport = () => {
    this.conductor.startTransport();
  };

  stopTransport = () => {
    this.conductor.stopTransport();
  };

  pauseTransport = () => {
    this.conductor.pauseTransport();
  };

  handleBpmChange = event => {
    const target = event.currentTarget;
    const value = target.value;

    this.setState(state => ({ bpm: value }));
    this.conductor.setBPM(this.state.bpm);
  };

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
            <img
              width="100px"
              height="100px"
              src={play}
              alt="play"
              onClick={this.startTransport}
            />
          </button>
          <button>
            <img
              width="100px"
              height="100px"
              src={stop}
              alt="stop"
              onClick={this.stopTransport}
            />
          </button>
          <button>
            <img
              width="100px"
              height="100px"
              src={pause}
              alt="pause"
              onClick={this.pauseTransport}
            />
          </button>
        </div>
        <pre />
      </div>
    );
  }
}
