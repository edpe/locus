import React, { Component } from 'react';
import Agent from 'simple-agent';
// import Tone from 'tone';


// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  componentDidMount() {
    this.agentEd = new Agent();
  // this.agentEd.addLoop("C2", "16n", "8n"); //note, length, loop interval
   // this.agentEd.playLoop(0, 0, "8m"); // loop number, start time, end time
    this.agentEd.addPattern(["A2", "C3", "E3", "A2"], "upDown");
    this.agentEd.playPattern(0, 0, "16m") // notes array, order/pattern
  }

  componentWillUnmount() {
    this.agentEd.cleanup();
  }



  render() {
    return (
      <div>
        <pre>
        </pre>
      </div>
    );
  }
}
