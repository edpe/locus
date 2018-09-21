class Composer {
  constructor(tone) {
    this.loops = [];
    this.chords = [];
    this.scale = ["C", "D", "E", "F", "G", "A", "B"];
    this.tone = tone;
    this.polySynth = new tone.PolySynth(8, tone.Synth).toMaster();
    this.synth = new tone.MembraneSynth().toMaster();
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
      new this.tone.Loop(function(time) {
        this.synth.triggerAttackRelease(note, length, time, 0.5);
      }, loopInterval)
    );
  }

  makePattern(quant, oct, order, length) {
    return new this.tone.Pattern(
      (time, note) => this.polySynth.triggerAttackRelease(note, length),
      this.generateNotes(quant, oct),
      order
    );
  }

  addChord(chordNotes, length) {
    this.chords.push(
      new this.tone.Event(function(time, note) {
        this.polySynth.triggerAttackRelease(note, "1n", time, 0.5);
      }, chordNotes)
    );
  }
}

module.exports = Composer;
