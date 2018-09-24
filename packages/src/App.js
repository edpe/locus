import React, { Component } from "react";
import Tone from "tone";

import logo from "./logo.svg";
import "./App.css";

import Conductor from "./Conductor";
import Composer from "./Composer";

class App extends Component {
  constructor(props) {
    super(props);
    this.tone = Tone;
    this.state = {};
    this.roles = {
      melody: {
        name: "melody",
        noteAmount: 8,
        octave: 6,
        order: "up",
        noteLength: "32n",
        playbackRate: 2
      },
      counterMelody: {
        name: "counterMelody",
        noteAmount: 4,
        octave: 4,
        order: "up",
        noteLength: "8n",
        playbackRate: 1
      },
      bass: {
        name: "bass",
        noteAmount: 2,
        octave: 2,
        order: "up",
        noteLength: "1n",
        playbackRate: 0.25
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Locus</h1>
        </header>
        <Conductor transport={this.tone.Transport} />
        <p>{this.roles.melody.name}</p>
        <Composer tone={this.tone} role={this.roles.melody} />
        <p>{this.roles.counterMelody.name}</p>
        <Composer tone={this.tone} role={this.roles.counterMelody}/>
        <p>{this.roles.bass.name}</p>
        <Composer tone={this.tone} role={this.roles.bass}/>
        <p className="App-intro" />
      </div>
    );
  }
}

export default App;
