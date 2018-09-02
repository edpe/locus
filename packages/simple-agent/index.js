const Tone = require('./node_modules/tone/build/Tone.js')

class Agent {
    constructor(options) {
      this.synth = new Tone.Synth
      this.synth.toMaster()
    }

    playNote(note, length) {
      this.synth.triggerAttackRelease(note, length)
    }

    doThing() {
      console.log(this.synth);

      return {
        some: 'thing'
      };
    }

    cleanup() {
      console.log('ive removed stuff');
    }
}

module.exports = Agent;
