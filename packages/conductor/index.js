const transport = require("tone").Transport;

class Conductor {
  constructor(options) {}

  startTransport() {
    console.log('hello there 1');
    transport.start();
  }

  stopTransport() {
    console.log('hello there 2');
    transport.stop();
  }

  pauseTransport() {
    console.log('hello there 3');
    transport.pause();
  }

  setBPM(bpm) {
    console.log('hello there 4');
    transport.bpm.value = bpm;
  }
}

module.exports = Conductor;
