const transport = require("tone").Transport;

class Conductor {
  constructor(options) {}

  startTransport() {
  require("tone").Transport.start();
  }

  stopTransport() {
    require("tone").Transport.stop();
  }

  pauseTransport() {
    console.log(require("tone").Transport)
    // require("tone").Transport.pause();
  }

  setBPM(bpm) {
    require("tone").Transport.bpm.value = bpm;
  }
}

module.exports = Conductor;
