import React, { Component } from "react";
import Agent from "simple-agent";

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  componentDidMount() {
    this.agentEd = new Agent();
    console.log(this.agentEd);
    // this.agentEd.addLoop("C2", "16n", "8n"); //note, length, loop interval
    // this.agentEd.playLoop(0, 0, "8m"); // loop number, start time, end time
    this.agentEd.addPattern(["A4", "B4", "C5", "D5"], "up", "16n");
    this.agentEd.playPattern(0, 0, "4m"); // notes array, order/pattern
  }

  componentWillUnmount() {
    this.agentEd.cleanup();
  }

  render() {
    return (
      <div>
        <pre />
      </div>
    );
  }
}
