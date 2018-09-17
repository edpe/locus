import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Agent from './Agent';

class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Locus</h1>
        </header>
        <Agent />
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
