class Composer {
  constructor(tone, role) {
    this.scale = ["C", "D", "E", "F", "G", "A", "B"];
    this.tone = tone;
    this.role = role;
    this.fbDelay = new tone.FeedbackDelay("16n", 0.7).toMaster();
    this.polySynth = new tone.PolySynth({
      polyphony: 8,
      voice: this.synth
    }).connect(this.fbDelay);
    this.squareSynth = new tone.Synth({
      oscillator: {
        type: "square4",

      },
      envelope: {
        attack: 2,
        decay: 0.1,
        sustain: 0.1,
        release: 2
      }
    }).toMaster();
  }

  static generateIndices(quant) {
    var indexArray = [];
    var i;
    for (i = 0; i < quant; i++) {
      indexArray.push(Math.floor(Math.random() * Math.floor(7)));
    }
    return indexArray;
  }

  generateNotes(quant, oct) {
    var indexArray = Composer.generateIndices(quant);
    var pitchArray = indexArray.map(i => this.scale[i]);
    var notesArray = pitchArray.map(i => i + oct);
    return notesArray;
  }

  makePattern(role) {
    var newPattern = new this.tone.Pattern(
      (time, note) =>
        this.squareSynth.triggerAttackRelease(note, this.role.noteLength),
      this.generateNotes(this.role.noteAmount, this.role.octave),
      this.role.order
    );
    newPattern.playbackRate = this.role.playbackRate;
    newPattern.probability = this.role.presence;
    return newPattern;
  }
}

module.exports = Composer;
