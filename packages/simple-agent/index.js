const { Synth, Loop, PolySynth, Pattern } = require("tone");

require("tone").Transport.start(0);

const polySynth = new PolySynth(6, Synth).toMaster();

class Agent {
  constructor(options) {
    this.instrument = polySynth;
    this.loops = [];
    this.patterns = [];
  }

  addLoop(note, length, loopInterval) {
    this.loops.push(
      new Loop(function(time) {
        polySynth.triggerAttackRelease(note, length, time);
      }, loopInterval)
    );
  }

  addPattern(notes, order, length) {
    this.patterns.push(
      new Pattern(
        function(time, note) {
          polySynth.triggerAttackRelease(note, length);
        },
        notes,
        order
      )
    );
  }

  playPattern(patternIndex, start, end) {
    this.patterns[patternIndex].start(start).stop(end);
    console.log(this.patterns[patternIndex]);
  }

  playLoop(loopIndex, start, end) {
    this.loops[loopIndex].start(start).stop(end);
  }

  cleanup() {
    console.log("ive removed stuff");
  }
}

module.exports = Agent;
