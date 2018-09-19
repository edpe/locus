import React, { Component } from "react";

import logo from "./logo.svg";
import "./App.css";

import Conductor from "./Conductor";
import Composer from "./Composer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Locus</h1>
        </header>
        <Conductor />
        <Composer />
        <p className="App-intro" />
      </div>
    );
  }
}

export default App;
