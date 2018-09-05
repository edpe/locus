const Tone = require('./node_modules/tone/build/Tone.js')

class Meter {
    constructor(options) {
      this.transport = Tone.Transport
      console.log(this.transport)
    }

    start() {
      this.transport.start()
    }

    stop() {
      this.transport.stop()
    }

    setBPM(bpm) {
      this.transport.bpm.value = bpm;
    }

    cleanup() {
      console.log('ive removed stuff');
    }
}

module.exports = Meter;
