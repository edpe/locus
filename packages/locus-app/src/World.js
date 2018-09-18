import React, { Component } from 'react';

// import './App.css';

import Conductor from './Conductor';
import Composer from './Composer';
import Player from './Player';

export default class WorldWrapper extends Component {
  render() {

    return (
      <div >
      <Conductor />
      <Composer />
      <Player />
      </div>
    );
  }
}
