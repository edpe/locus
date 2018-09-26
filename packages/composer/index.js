class Composer {
  constructor(tone, role) {
    this.scale = ["C", "D", "E", "F", "G", "A", "B"];
    this.tone = tone;
    this.role = role;
    this.fbDelay = new tone.FeedbackDelay("16n", 0.7).toMaster();

    this.squareSynth = new tone.Synth({
      oscillator: {
        type: "square4"
      },
      envelope: {
        attack: 2,
        decay: 0.1,
        sustain: 0.1,
        release: 2
      }
    }).toMaster();
    this.polySynth = new tone.PolySynth({
      polyphony: 8,
      voice: this.synth
    }).connect(this.fbDelay);
  }

  //generates an array of random numbers of length x
  static generateIndices(length) {
    var indexArray = [];
    var i;
    for (i = 0; i < length; i++) {
      indexArray.push(Math.floor(Math.random() * Math.floor(7)));
    }
    return indexArray;
  }

  generateVelocities(velocity, deviation) {
    var indexArray = [];
    var i;
    for (i = 0; i < 7; i++) {
      indexArray.push(velocity + ((Math.random() - 0.5) * deviation));
    }
    return indexArray[Math.floor(Math.random() * indexArray.length)];
  }

  // selects notes from the scale using indices from generateIndices
  generateNotes(length, oct) {
    var indexArray = Composer.generateIndices(length);
    var pitchArray = indexArray.map(i => this.scale[i]);
    var notesArray = pitchArray.map(i => i + oct);
    return notesArray;
  }

  makePattern(role) {
    var newPattern = new this.tone.Pattern(
      (time, note) =>
        this.polySynth.triggerAttackRelease(
          note,
          this.role.noteLength,
          time,
          this.generateVelocities(this.role.velocity, this.role.velocityDeviation)
        ),
      this.generateNotes(this.role.noteAmount, this.role.octave),
      this.role.order
    );
    newPattern.playbackRate = this.role.playbackRate;
    newPattern.probability = this.role.presence;
    return newPattern;
  }
}

module.exports = Composer;
