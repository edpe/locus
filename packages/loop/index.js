const Tone = require("./node_modules/tone/build/Tone.js");

class Loop {
  constructor(note, length) {
    this.loop = new Tone.Loop(function(time) {
      synth.triggerAttackRelease(note, length, time);
    }, "4n");
  }

  play(start, end) {
    // start and end are set with time values
    this.loop.start(start).stop(end);
  }

}

module.exports = Loop;
