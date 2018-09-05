const Tone = require("./node_modules/tone/build/Tone.js");

class Instrument {
  constructor(options) {
    this.instrument = new Tone.Synth
    this.instrument.toMaster()
  }

  triggerAttackRelease(note, length) {
    this.instrument.triggerAttackRelease(note, length)
  }
}

module.exports = Instrument;
