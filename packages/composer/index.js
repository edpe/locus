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

class Composer {
  constructor(options) {
    this.instrument = polySynth;
    this.loops = [];
    this.chords = [];
    this.scale = ["C", "D", "E", "F", "G", "A", "B"];
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

  makePattern(quant, oct, order, length) {
    return new Pattern(
      function(time, note) {
        polySynth.triggerAttackRelease(note, length);
      },
      this.generateNotes(quant, oct),
      order
    );
  }

  addChord(chordNotes, length) {
    this.chords.push(
      new Event(function(time, note) {
        polySynth.triggerAttackRelease(note, "1n", time, 0.5);
      }, chordNotes)
    );
  }
}

module.exports = Composer;
