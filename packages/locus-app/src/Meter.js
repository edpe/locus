import React, { Component } from 'react';
import Meter from 'meter';

// pull in graphing/waveform lib
export default class MeterWrapper extends Component {
  constructor(props) {
    super(props);

    this.meter= new Meter()
  }

  componentWillUnmount() {
    this.agent.cleanup();
  }

  render() {
    return (
      <div>
        <pre>
        {JSON.stringify(this.meter.setBPM(80), null, '  ')}
          {JSON.stringify(this.meter.start(), null, '  ')}
        </pre>
      </div>
    );
  }
}
