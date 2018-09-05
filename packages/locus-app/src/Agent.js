import React, { Component } from 'react';
import Agent from 'simple-agent';
import Loop from 'loop';
import Instrument from 'instrument';

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  constructor(props) {
    super(props);

    this.agentEd = new Agent(new Loop("C1", "8n"), new Instrument());

  }

  componentWillUnmount() {
    this.agent.cleanup();
  }

  render() {
    return (
      <div>
        <pre>
          {this.agentEd.playNote('C4', '16n')}
          {this.agentEd.playLoop()}
        </pre>
      </div>
    );
  }
}
