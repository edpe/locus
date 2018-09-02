import React, { Component } from 'react';
import Agent from 'simple-agent';

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  constructor(props) {
    super(props);

    this.agentEd = new Agent({ name: 'ed'});
    this.agentRob = new Agent({ name: 'rob'});
  }

  componentWillUnmount() {
    this.agent.cleanup();
  }

  render() {
    return (
      <div>
        <pre>
          {JSON.stringify(this.agentEd.playNote('C4', '8n'), null, '  ')}
          {JSON.stringify(this.agentRob.playNote('G4', '8n'), null, '  ')}
        </pre>
      </div>
    );
  }
}
