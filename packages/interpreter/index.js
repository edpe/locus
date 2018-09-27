class Interpreter {
  constructor(tone, role) {
    this.seed = []
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

//generate parts from seed data


}

module.exports = Interpreter;
