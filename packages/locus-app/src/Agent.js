import React, { Component } from "react";
import Agent from "simple-agent";

// pull in graphing/waveform lib
export default class AgentWrapper extends Component {
  constructor(props) {
    super(props)
    this.agentEd = new Agent();
  }
  componentDidMount() {
    //this first


    this.agentEd.addLoop("C2", "8n", "4n"); //note, length, loop interval
    this.agentEd.addChord(["A2", "C3", "E3", "A3"], "16n");
    this.agentEd.addChord(["A3", "C4", "E4", "A4"], "16n");
    this.agentEd.addPattern(["A4", "B4", "C5", "D5"], "up", "8n"); //notes to play, order to play them in, length of notes
    this.agentEd.addPattern(["A3", "B3", "C4", "D4"], "up", "8n");
    console.log(this.agentEd)

    //then this after 1000ms
    setTimeout(function() {
      console.log("this one", this.agentEd)
      this.agentEd.startTransport}, 2000)

    //then this next
    this.agentEd.playLoop(0, 0, "4m"); // loop number, start time, end time
    this.agentEd.playChord(0, 0, 4, "1m"); // chord index, start, repeats, length
    this.agentEd.playChord(1, 0, 4, "1m"); // chord index, start, repeats, length
    this.agentEd.playPattern(0, 0, "4m"); // index of patern to play, start point, end point(bars/measures)
    this.agentEd.playPattern(1, 0, "4m"); // index of patern to play, start point, end point(bars/measures)

  }

  render() {
    return (
      <div>
        <pre />
      </div>
    );
  }
}
