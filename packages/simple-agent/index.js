const Tone = require("./node_modules/tone/build/Tone.js");

class Agent {
  constructor(loop, instrument) {
    this.instrument = instrument;
    this.loop = loop
    console.log(this.loop)
  }

  playNote(note, length) {
    this.instrument.triggerAttackRelease(note, length);
  }

  playLoop(start, end) {
    this.loop.play(start, end)
  }


  cleanup() {
    console.log("ive removed stuff");
  }
}

module.exports = Agent;
