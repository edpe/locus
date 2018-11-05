class Interpreter {
  constructor(tone, role) {
    this.scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    this.seed = [{ time : "0:0:0", note : 'C4', dur : '1n'},
	{ time : '1:0:0', note : 'D4', dur : '1n'},
	{ time : '2:0:0', note : 'E4', dur : '2n'},
	{ time : '2:2:0', note : 'G4', dur : '2n'}, { time : '3:0:0', note : 'C4', dur : '1n'}]
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

  renderSeed() {
    var newPart = new this.tone.Part(
      (time, event) =>
      this.polySynth.triggerAttackRelease(event.note, event.dur, time), this.seed
    );
    return newPart;

  }

interpretPart() {
  var newPart = new this.tone.Part(
    (time, event) =>
    this.polySynth.triggerAttackRelease(event.note, event.dur, time), this.seed
  );
  return newPart;

}
//generate parts from seed data


}

module.exports = Interpreter;
