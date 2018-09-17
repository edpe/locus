const {
  Synth,
  Loop,
  PolySynth,
  MembraneSynth,
  MetalSynth,
  Pattern,
  Event,
  Part
} = require("tone");

const polySynth = new PolySynth(8, Synth).toMaster();
const synth = new MembraneSynth().toMaster();
const cymbal = new MetalSynth().toMaster();

class Agent {
  constructor(options) {
    this.instrument = polySynth;
    this.loops = [];
    this.patterns = [];
    this.chords = [];
  }

  startTransport() {
    console.log("called from inside agent")
      require("tone").Transport.start();
      console.log(require("tone").Transport)
    }

  stopTransport() {
    require("tone").Transport.stop();
  }

  pauseTransport() {
    require("tone").Transport.pause();
  }

  setBPM(bpm) {
    require("tone").Transport.bpm.value = bpm;
  }

  addLoop(note, length, loopInterval) {
    this.loops.push(
      new Loop(function(time) {
        synth.triggerAttackRelease(note, length, time, 0.5);
      }, loopInterval)
    );
  }

  addPattern(notes, order, length, rate) {
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

  addChord(chordNotes, length) {
    this.chords.push(
      new Event(function(time, note) {
        polySynth.triggerAttackRelease(note, "1n", time,  0.5);
      }, chordNotes)

    );
  }

  playPattern(patternIndex, start, end) {
    this.patterns[patternIndex].start(start).stop(end);
  }

  playLoop(loopIndex, start, end) {
    this.loops[loopIndex].start(start).stop(end);
  }

  playChord(chordIndex, start, repeats, length) {
    this.chords[chordIndex].loop = repeats;
    this.chords[chordIndex].loopEnd = length;
    this.chords[chordIndex].start();
  }

  logTransport1() {
    require("tone").Transport.scheduleRepeat(function(time) {
      cymbal.triggerAttackRelease();
    }, "4n");
  }

  logTransport2() {
    require("tone").Transport.scheduleRepeat(function(time) {
    }, "8n");
  }
}

module.exports = Agent;
