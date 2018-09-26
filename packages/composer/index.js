class Composer {
  constructor(tone, role) {
    this.scale = ["C", "G", "E", "F", "A", "D", "B"];
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
  static generateIndices(length) {
    var indexArray = []; // pull in graphing/waveform lib
    var i;
    for (i = 0; i < length; i++) {
      indexArray.push(Math.floor(Math.random() * 7));
    }
    return indexArray;
  }

  generateVelocities(velocity, deviation) {
    var indexArray = [];
    var i;
    for (i = 0; i < 7; i++) {
      indexArray.push(velocity + (Math.random() - 0.5) * deviation);
    }
    return indexArray[Math.floor(Math.random() * indexArray.length)];
  }

  generateNoteLength(lengthIndex, deviation) {
    var devMin = 1 - deviation;
    var devMax = 1 + deviation;
    var rangedRandom = Math.floor(
      lengthIndex * (devMin + (Math.random() * (devMax - devMin)))
    );
    console.log(this.noteLengths[rangedRandom])
    return this.noteLengths[rangedRandom];
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
          this.generateNoteLength(
            this.role.noteLength,
            this.role.noteLengthDeviation
          ),
          time,
          this.generateVelocities(
            this.role.velocity,
            this.role.velocityDeviation
          )
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
