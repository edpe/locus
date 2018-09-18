const {
  Synth,
  Loop,
  PolySynth,
  MembraneSynth,
  Pattern,
  Event,
  Part
} = require("tone");

const polySynth = new PolySynth(8, Synth).toMaster();
const synth = new MembraneSynth().toMaster();

class Agent {
  constructor(options) {
    this.instrument = polySynth;
    this.loops = [];
    this.patterns = [];
    this.chords = [];
    this.scale = ["C", "D", "E", "F", "G", "A", "B"];
  }

  startTransport() {
    require("tone").Transport.start();
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

  generateIndices(quant) {
    var indexArray = [];
    var i;
    for (i = 0; i < quant; i++) {
      indexArray.push(Math.floor(Math.random() * Math.floor(7)));
    }
    return indexArray;
  }

  generateNotes(quant, oct) {
    var indexArray = this.generateIndices(quant);
    var pitchArray = indexArray.map(i => this.scale[i]);
    var notesArray = pitchArray.map(i => i + oct);
    return notesArray;
  }

  addLoop(note, length, loopInterval) {
    this.loops.push(
      new Loop(function(time) {
        synth.triggerAttackRelease(note, length, time, 0.5);
      }, loopInterval)
    );
  }

  addPattern(quant, oct, order, length, rate) {
    this.patterns.push(
      new Pattern(
        function(time, note) {
          polySynth.triggerAttackRelease(note, length);
        },
        this.generateNotes(quant, oct)
        ,
        order
      )
    );
  }

  addChord(chordNotes, length) {
    this.chords.push(
      new Event(function(time, note) {
        polySynth.triggerAttackRelease(note, "1n", time, 0.5);
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
}

module.exports = Agent;
