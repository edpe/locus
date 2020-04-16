import React, { Component } from 'react';
import SeedFactory from 'seed-factory';

export default class SeedFactoryWrapper extends Component {
  constructor(props) {
    super(props);
    this.seedFactory = new SeedFactory(this.props.song, this.props.role);
  }

  componentDidMount() {
    console.log(this.seedFactory.generateMelody())
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
