import React, { Component } from 'react';
import Agent from 'simple-agent';
// import Tone from 'tone';


// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  componentDidMount() {
    this.agentEd = new Agent();
    this.agentEd.addLoop("C2", "16n", "8n"); //note, length, loop interval
    this.agentEd.playLoop(0, 0, "8m"); // loop number, start time, end time
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
