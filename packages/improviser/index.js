class Improviser {
  constructor(tone, role) {
    this.scale = ["A", "C", "E", "D", "A", "E", "C"];
    this.rhythm = ["4n", "8n", "64n", "4n"]
    this.noteLengths = [
      "64t",
      "64n",
      "64n.",
      "32t",
      "32n",
      "32n.",
      "16t",
      "16n",
      "16n.",
      "8t",
      "8n",
      "8n.",
      "4t",
      "4n",
      "4n.",
      "2t",
      "2n",
      "2n.",
      "1t",
      "1n",
      "1n."
    ];
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
  static generateImprovisedIndices(length) {
    var indexArray = [];
    var i;
    for (i = 0; i < length; i++) {
      indexArray.push(Math.floor(Math.random() * 7));
    }
    return indexArray;
  }

  generateImprovisedVelocities(velocity, deviation) {
    var indexArray = [];
    var i;
    for (i = 0; i < 7; i++) {
      indexArray.push(velocity + (Math.random() - 0.5) * deviation);
    }
    return indexArray[Math.floor(Math.random() * indexArray.length)];
  }

  generateImprovisedNoteLength(lengthIndex, deviation) {
    var devMin = 1 - deviation;
    var devMax = 1 + deviation;
    var rangedRandom = Math.floor(
      lengthIndex * (devMin + (Math.random() * (devMax - devMin)))
    );
    return this.noteLengths[rangedRandom];
  }

  // selects notes from the scale using indices from generateIndices
  generateImprovisedNotes(length, oct) {
    var indexArray = Improviser.generateImprovisedIndices(length);
    var pitchArray = indexArray.map(i => this.scale[i]);
    var notesArray = pitchArray.map(i => i + oct);
    return notesArray;
  }

  makeImprovisedPattern(role) {
    var newPattern = new this.tone.Pattern(
      (time, note) =>
        this.polySynth.triggerAttackRelease(
          note,
          this.generateImprovisedNoteLength(
            this.role.noteLength,
            this.role.noteLengthDeviation
          ),
          time,
          this.generateImprovisedVelocities(
            this.role.velocity,
            this.role.velocityDeviation
          )
        ),
      this.generateImprovisedNotes(this.role.noteAmount, this.role.octave),
      this.role.order
    );
    newPattern.playbackRate = this.role.playbackRate;
    newPattern.probability = this.role.presence;
    return newPattern;
  }
}

module.exports = Improviser;
