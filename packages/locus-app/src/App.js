import React, { Component } from "react";
import Tone from "tone";

import logo from "./logo.svg";
import "./App.css";

import Conductor from "./Conductor";
import Improviser from "./Improviser";
import Interpreter from "./Interpreter";

class App extends Component {
  constructor(props) {
    super(props);
    this.tone = Tone;
    this.song = "Aenea";
    this.state = {};
    this.roles = {
      melody: {
        name: "melody",
        noteAmount: 8,
        octave: 5,
        order: "up",
        noteLength: 5,
        noteLengthDeviation: 1.,
        playbackRate: 1,
        presence: 0.5,
        velocity: 0.5,
        velocityDeviation: 1.
      },
      counterMelody: {
        name: "counterMelody",
        noteAmount: 4,
        octave: 4,
        order: "up",
        noteLength: 5,
        noteLengthDeviation: 1.,
        playbackRate: 1,
        presence: 0.5,
        velocity: 0.5,
        velocityDeviation: 1.
      },
      bass: {
        name: "bass",
        noteAmount: 4,
        octave: 2,
        order: "up",
        noteLength: 17,
        noteLengthDeviation: 0.,
        playbackRate: 0.25,
        presence: 1,
        velocity: 0.5,
        velocityDeviation: .2
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
        <h2>Improviser</h2>
        <p>{this.roles.melody.name}</p>
        <Improviser tone={this.tone} role={this.roles.melody} />
        <p>{this.roles.counterMelody.name}</p>
        <Improviser tone={this.tone} role={this.roles.counterMelody}/>
        <p>{this.roles.bass.name}</p>
        <Improviser tone={this.tone} role={this.roles.bass}/>
        <h2>Interpreter</h2>
        <p>{this.roles.melody.name}</p>
        <Interpreter tone={this.tone} role={this.roles.melody} song={this.song}/>
        <p>{this.roles.counterMelody.name}</p>
        <Interpreter tone={this.tone} role={this.roles.counterMelody} song={this.song}/>
        <p>{this.roles.bass.name}</p>
        <Interpreter tone={this.tone} role={this.roles.bass} song={this.song}/>
        <p className="App-intro" />
      </div>
    );
  }
}

export default App;
