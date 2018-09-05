import React, { Component } from 'react';
import Agent from 'simple-agent';
import Loop from 'loop';
import Instrument from 'instrument';

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  constructor(props) {
    super(props);
//instruments should have behaviours which can be loops, chords or patterns etc.
//it is up to the agent to make the selection of what the instrument should do
    this.agentEd = new Agent(new Instrument(), new Loop("C1", "4n"));

  }

  componentWillUnmount() {
    this.agent.cleanup();
  }

  render() {
    return (
      <div>
        <pre>
          {this.agentEd.playNote('C4', '16n')}
        </pre>
      </div>
    );
  }
}
