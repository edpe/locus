const { Synth, Loop } = require("tone");

require('tone').Transport.start(0)

const polySynth = new Tone.PolySynth(6, Tone.Synth).toMaster();


class Agent {
  constructor(options) {
    this.instrument = synth;
    this.loops = [];
  }

  addLoop(note, length, loopInterval) {
    this.loops.push(
      new Loop(function(time) {
        synth.triggerAttackRelease(note, length, time);
      }, loopInterval)
    );
  }



  playLoop(loopIndex, start, end) {
    this.loops[loopIndex].start(start).stop(end);
  }

  cleanup() {
    console.log("ive removed stuff");
  }
}

module.exports = Agent;
